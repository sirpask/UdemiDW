//Import basicos de un servicio
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable'
//import ya propios
import { GLOBAL } from './global';





//para poder injectar este decorador en cualquier otro logeado
//crearemos un fichero global para la url, si no se pondria aqui
@Injectable()
export class userService{
    public url: string;

    constructor(private _http: Http){
        this.url = GLOBAL.url;
    }

    signup(user_to_login, gethash = null){
        //return 'Hola mundo desde el servicio';
        if (gethash != null){
            user_to_login.gethash = gethash;
        }
        let json = JSON.stringify(user_to_login);
        let params = json;

        let headers = new Headers({'Content-Type':'application/json'});

        return this._http.post(this.url+'login', params, {headers: headers})
                        .map(res => res.json());
    }

}
