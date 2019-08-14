function vec4ToMatrix(v){
  let m = [];
  for (let i = 0; i < 4; i++) {
        m[i] = [];
  }
  m[0][0] = v.x;
  m[1][0] = v.y;
  m[2][0] = v.z;
  m[3][0] = v.w;
  return m;
}

function vec5ToMatrix(v){
  let m = [];
  for (let i = 0; i < 5; i++) {
        m[i] = [];
  }
  m[0][0] = v.x;
  m[1][0] = v.y;
  m[2][0] = v.z;
  m[3][0] = v.w;
  m[4][0] = v.u;
  return m;
}

function vec6ToMatrix(v){
  let m = [];
  for (let i = 0; i < 6; i++) {
        m[i] = [];
  }
  m[0][0] = v.x;
  m[1][0] = v.y;
  m[2][0] = v.z;
  m[3][0] = v.w;
  m[4][0] = v.u;
  m[5][0] = v.t;
  return m;
}


function matrixToVec(m){
  return createVector(m[0][0], m[1][0], m[2][0]);
}

function matrixToVec4(m){
  let v = new P4Vector(m[0][0], m[1][0], m[2][0], 0);
  if (m.length > 3) {
    v.w = m[3][0];
  }
  return v;
}

function matrixToVec5(m){
  let v = new P5Vector(m[0][0], m[1][0], m[2][0], m[3][0], m[4][0]);
  return v;
}

function matrixToVec6(m){
  let v = new P6Vector(m[0][0], m[1][0], m[2][0], m[3][0], m[4][0], m[5][0]);
  return v;
}

// void logMatrix(float[][] m){
//   int cols = m[0].length;
//   int rows = m.length;
//   println(rows + "x" + cols);
//   println("----------------");
//   for (int i = 0; i < rows; i++){
//     for (int j = 0; j < cols; j++){
//       print(m[i][j] + " ");
//     }
//     println();
//   }
//   println();
// }

function matmul4D_P(a, b){
  let m = vec4ToMatrix(b);
  return matrixToVec(matmul(a, m));
}

function matmul4D_R(a, b){
  let m = vec4ToMatrix(b);
  return matrixToVec4(matmul(a, m));
}

function matmul5D_P(a, b){
  let m = vec5ToMatrix(b);
  return matrixToVec4(matmul(a, m));
}

function matmul5D_R(a, b){
  let m = vec5ToMatrix(b);
  return matrixToVec5(matmul(a, m));
}

function matmul6D_P(a, b){
  let m = vec6ToMatrix(b);
  return matrixToVec5(matmul(a, m));
}

function matmul6D_R(a, b){
  let m = vec6ToMatrix(b);
  return matrixToVec6(matmul(a, m));
}



function matmul(a, b){
  // if (b instanceof p5.Vector) {
  //   return matmulVec(a, b);
  // }
  // if (b instanceof P4Vector) {
  //   return matmulVec4(a, b);
  // }

  let colsA = a[0].length;
  let rowsA = a.length;
  let colsB = b[0].length;
  let rowsB = b.length;

  if(colsA !== rowsB){
    console.error("Columns of A must match rows of B");
    return null;
  }
  let result = [];
    for (let i = 0; i < rowsA; i++){
      result[i] = [];
      for (let j = 0; j < colsB; j++){
        //Dot product pf value in col
        let sum = 0;
        for(let k = 0; k < colsA/* == rowsB*/; k++){
          sum += a[i][k] * b[k][j];
        }
        result[i][j] = sum;
      }
    }
    return result;
}
