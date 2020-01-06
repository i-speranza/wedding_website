// class Regalo {
//   constructor(name, price, short, img, categ) {
//     this.name = name;
//     this.price = price;
//     this.short = short;
//     this.img = img;
//     this.categ = categ;
//   }
//   render() {
//     return "<div class='card h-100 text-center'>
//               <img src=" + this.img +" class='card-img-top' alt='...'>
//                   <div class='card-body'>
//                     <h5 class='card-title'> "+ this.name + "<br>550&euro;</h5>
//                     <div class='progress'>
//                       <div class='progress-bar' role='progressbar' style='width: 25%' aria-valuenow='25' aria-valuemin='0' aria-valuemax='100'></div>
//                     </div>
//                   </div>
//                   <div class='card-footer'>
//                     <button type='button' class='btn btn-primary'
//                             data-toggle='modal' data-target='#ModalRegalo' data-item=" + this.short + " data-category=" + this.categ +  ">
//                             Contribuisci!
//                     </button>
//                   </div>
//                 </div>";
//   }
// }
//
// myRegalo = new Regalo("Casa", 30000, "Cs", "/img.jpg");
//
// document.getElementById("demo").innerHTML = myRegalo.render();
