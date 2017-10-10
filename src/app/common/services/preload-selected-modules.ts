/**
 * Created by yisense on 2016/12/5.
 */
import {Injectable} from "@angular/core";
import {PreloadingStrategy, Route} from "@angular/router";
import {Observable} from "rxjs/Observable";

@Injectable()
export class PreloadSelectedModules implements PreloadingStrategy {

  preloadedModules: string[] = [];

  preload(route: Route, load: Function): Observable<any> {
    if (route.data && route.data['preload']) {
      this.preloadedModules.push(route.path);
      return load();
    } else {
      return Observable.of(null);
    }
  }
}
