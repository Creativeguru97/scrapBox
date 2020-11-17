let hômNay = new Date();
let bâyGiờ = hômNay.getHours();

let xoan = new ConNgười();
let lan = new ConNgười();
let bơ = new QuảBơ();
let kaz = new ConNgười();

let mọiNgười = [xoan, lan, bơ, kaz];

if(mọiNgười muốn ăn trưa ở kia){
  gặpNhau(Jyuso, 11);
}else if (mọiNgười muốn ăn tối ở kia || xem lá đỏ rực với ánh sáng) {
  gặpNhau(Jyuso, 17);
}else{
  console.error("Hôm khác nhé");
}

function gặpNhau(nơi, thờiGian){
  if(bâyGiờ == thờiGian - 1){
    lan.gặp(kaz);
    bơ.gặp(kaz);
  }else if (bâyGiờ == thờiGian) {
    lan.gặp(xoan);
    bơ.gặp(xoan);
    kaz.gặp(xoan);
  }
}

class ConNgười(){
  constructor(){
  }

  gặp(ai){
    if (this.dist(ai) > 0){
      this.dist(ai)--;
    }else{}
  }
}

class QuảBơ(){
  constructor(){
  }

  gặp(vật){
    if (this.dist(vật) > 0){
      this.dist(vật)--;
    }else{}
  }
}
