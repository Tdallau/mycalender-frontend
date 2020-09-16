import { AuthService } from "./../_services/auth.service";
import { TokenSettings } from "./../_models/Authorization/loginResponse";
import { Injectable, Injector } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpResponse,
} from "@angular/common/http";
import { Observable, throwError as observableThrowError, of } from "rxjs";
import { catchError, tap, mergeMap } from "rxjs/operators";

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  constructor(private inj: Injector) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log(request.url);
    if (
      request.url.includes("authorization") || request.url.endsWith('calender', request.url.length - 1)
    ) {
      return this.handleIntercept(null, request, next, 1);
    }
    const authService = this.inj.get(AuthService);
    return authService.getLogin(true).pipe(
      mergeMap((tokenSettings) => {
        if (tokenSettings.success) {
          authService.updateToken(tokenSettings.data);
        } else {
          authService.logout();
        }
        return this.handleIntercept(
          tokenSettings.success ? tokenSettings.data : null,
          request,
          next,
          1
        ).pipe(
          mergeMap((response) => {
            if (response) {
              return of(response);
            }
            console.log(
              `Http error on '${request.url}' get new logon and try again...`
            );
            return authService.loginWithRefreshToken().pipe(
              mergeMap((tokenSettingsNew) => {
                if (tokenSettingsNew.success) {
                  authService.updateToken(tokenSettingsNew.data);
                  return this.handleIntercept(
                    tokenSettingsNew.success ? tokenSettingsNew.data : null,
                    request,
                    next,
                    2
                  );
                } else {
                  console.log("login not valid");
                }
              })
            );
          })
        );
      })
    );
  }

  private handleIntercept(
    tokenSettings: TokenSettings,
    request: HttpRequest<any>,
    next: HttpHandler,
    tries: number
  ): Observable<HttpEvent<any>> {
    let customReq: HttpRequest<any>;

    if (tokenSettings) {
      customReq = request.clone({
        headers: request.headers
          .set("Authorization", `Bearer ${tokenSettings.jwtToken}`)
          .set("Content-Type", "application/json"),
      });
    } else {
      customReq = request.clone();
    }

    return next
      .handle(customReq)
      .pipe(
        tap((ev: HttpEvent<any>) => {
          if (ev instanceof HttpResponse) {
            // console.info('processing response', ev);
          }
        })
      )
      .pipe(
        catchError((response) => {
          if (response instanceof HttpErrorResponse) {
            console.log("somthing went wrong on the server");
            console.log(response);
            if (tokenSettings && tries === 1) {
              return of(null);
            } else {
              return observableThrowError(response);
            }
          }
          console.log("somthing went wrong by processing the html");
          return observableThrowError(response);
        })
      );
  }
}