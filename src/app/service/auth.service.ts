import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { UserLogin } from '../model/UserLogin';
import { Usuario } from '../model/Usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }
  
  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }
  refreshToken(){
    this.token = {
      headers: new HttpHeaders().set('Authorization', environment.token)
    }
  }

  entrar(userLogin:UserLogin):Observable<UserLogin>{
    return this.http.post<UserLogin>('https://apiblogapplication.herokuapp.com/usuarios/logar', userLogin)

  }
  cadastrar(usuario:Usuario):Observable<Usuario>{
    return this.http.post<Usuario>('https://apiblogapplication.herokuapp.com/usuarios/cadastrar', usuario)

  }

  update(usuario:Usuario):Observable<Usuario>{
    return this.http.put<Usuario>('https://apiblogapplication.herokuapp.com/usuarios/atualizar', usuario, this.token)

  }

  getByIdUser(id:number):Observable<Usuario>{
    return this.http.get<Usuario>(`https://apiblogapplication.herokuapp.com/usuarios/${id}`,this.token)
  }

  getAllUser(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>('https://apiblogapplication.herokuapp.com/usuarios/all', this.token)
  }

  logado(){
    let ok = false

    if(environment.token != ''){
      ok = true
    }
    return ok
  }
}
