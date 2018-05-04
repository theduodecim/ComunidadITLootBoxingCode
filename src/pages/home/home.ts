import {Component} from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import {SERVER_URL} from "../../config";
import {AuthProvider} from "../../providers/auth/auth";
import {HttpClient} from "@angular/common/http";
import {NavController} from "ionic-angular";
declare var p5: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user: string;
  message: string;
  myp5: any; // objeto que sera utilizado para instanciar la libreria
  // de p5 con nuestra funcion que contiene nuestro codigo personalizado
  text: string;
  //en angular para llamar a los servicios y crear intancias de esas clases se añaden en el constructor de la clase
  constructor(private readonly authProvider: AuthProvider,
              jwtHelper: JwtHelperService,
              private readonly httpClient: HttpClient,
              private navCtrl: NavController) {

    this.authProvider.authUser.subscribe(jwt => { // authuser es un sujeto que contiene una respuesta y observo unas funciones
      if (jwt) { //
        const decoded = jwtHelper.decodeToken(jwt); // guardara
        this.user = decoded.sub
      }
      else {
        this.user = null;
      }
    });

  }
  // p5 es un plugin que se usa para poder dibujar y crear animaciones
  // Como funciona p5, p5 en ionic al parecer funciona dentro de los ciclos de eventos

  ionViewWillEnter() {
    this.httpClient.get(`${SERVER_URL}/secret`, {responseType: 'text'}).subscribe(
      text => this.message = text,
      err => console.log(err)
    );
    // p5 code
    var s = (p) => { // funcion s6 que toma como parametro la intancia de la libreria

      p.setup = function () {
        var cnv = p.createCanvas(200, 200);
        cnv.parent('myCanvas'); // id="myCanvas"
      };


    p.draw = () => { // draw es un metodo generico de p5 que lo que hace es correr este codigo constantemente y dibuja nuestra dibujo o animacion
      p.background(220, 180, 200);
      p.rect(20,100,120,80);
      //aqui la caja fija
    };

  //luego aqui esta la funcion touchMoved que ejecuta un evento click
    p.touchMoved = () => {
      //aqui creare la animacion
      this.navCtrl.push('ProfilePage'); //test
     // añadi que luego de la animacion
      // se dirija a una de las paginas en otro momento tendre q añadir un itervalo para que se pueda ver la animacion
      p.remove(p.createCanvas);  // encontre un bug que causaba que al ingresar en otra pagina creaba otro canvas
      // y si apretavas muchas veces causaba que se cargaban muchas veces esta pagina
      // añadi funcion remover otro metodo de p5 y dentro de el el canvas creado
     return false;
      };
    };

    this.myp5 = new p5(s); // ahora pasamos al constructor de esta libreria nuestra variable que contiene la funcion que creamos
  }

  logout() {
    this.authProvider.logout();
  }

  profilePage() {
    this.navCtrl.push('ProfilePage');
  }



}

