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
  //cambiar numeros por variables para crear animaciones
      p.background(0, 0, 0);
      p.strokeWeight(1);
      p.stroke(220);
      p.fill(0,0,0);
      p.rect(40,150,120,30); // front rect
      p.strokeWeight(1);
      //rect right size
      p.line(180,120,160,150);
      p.line(180,150,160,180);

      //top base
      p.line(180,120,180,150);

      /* p.line(76,120,80,150);*/ // check
      //
      p.line(75,120,180,120);
      p.line(40,149,75,120);

      //inner rect
      p.line(75,125,168,125); // top base
      p.line(169,125,155,145); // right line
      p.line(75,125,57,145);  // left line
      p.line(57,146,154,146); // base

      //the cover of the box
      p.rect(40,50,120,8); // front rect of the box
      p.line(175,30,60,30); // top base
      //rect right size
      p.line(160,50,175,30); // top base
      p.line(175,37,175,31);

      //left line of the cover
      p.line(160,58,175,37);
      p.line(40,50,60,30)
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

