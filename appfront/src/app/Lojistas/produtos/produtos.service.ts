import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { IProduto } from 'src/app/shared/Models/produto';


const httpOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  url = 'https://localhost:5001/api/Produtos';

  constructor(private http: HttpClient) { }

  ListarProduto(): Observable<IProduto[]>
  {
    return this.http.get<IProduto[]>(this.url, httpOptions)
  }

  PegarPeloId(id: number): Observable<IProduto>{
    const apiUrl  = `${this.url}/${id}`;
    return this.http.get<IProduto>(apiUrl)
  }

  //Salvar
  SalvarCategoria(produto: IProduto): Observable<any>{
    return this.http.post<IProduto>(this.url, produto, httpOptions);
  }

  //Atualizar
  AtualizarCategoria(produto: IProduto): Observable<any> {
    const apiUrl  = `${this.url}/${produto.id}`;
    return this.http.put<IProduto>(apiUrl, produto, httpOptions);
  }

  //excluir
  ExcluirCategoria(id: number):Observable<any>{
    const apiUrl = `${this.url}/${id}`;
    return this.http.delete<IProduto>(apiUrl, httpOptions);
  }
}
