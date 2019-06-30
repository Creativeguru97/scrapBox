float[][] vec6ToMatrix(P6Vector v){
  float[][] m = new float[6][1];
  m[0][0] = v.x;
  m[1][0] = v.y;
  m[2][0] = v.z;
  m[3][0] = v.w;
  m[4][0] = v.u;
  m[5][0] = v.t;
  return m;
}

float[][] vec5ToMatrix(P5Vector v){
  float[][] m = new float[5][1];
  m[0][0] = v.x;
  m[1][0] = v.y;
  m[2][0] = v.z;
  m[3][0] = v.w;
  m[4][0] = v.u;
  return m;
}

float[][] vec4ToMatrix(P4Vector v){
  float[][] m = new float[4][1];
  m[0][0] = v.x;
  m[1][0] = v.y;
  m[2][0] = v.z;
  m[3][0] = v.w;
  return m;
}

PVector matrixToVec(float [][] m){
  PVector v = new PVector();
  v.x = m[0][0];
  v.y = m[1][0];
  if(m.length > 2){
    v.z = m[2][0];
  }
  return v;
}

P4Vector matrixToVec4(float [][] m){
  P4Vector v = new P4Vector(0, 0, 0, 0);
  v.x = m[0][0];
  v.y = m[1][0];
  v.z = m[2][0];
  v.w = m[3][0];
  return v;
}

P5Vector matrixToVec5(float [][] m){
  P5Vector v = new P5Vector(0, 0, 0, 0, 0);
  v.x = m[0][0];
  v.y = m[1][0];
  v.z = m[2][0];
  v.w = m[3][0];
  v.u = m[4][0];
  return v;
}

P6Vector matrixToVec6(float [][] m){
  P6Vector v = new P6Vector(0, 0, 0, 0, 0, 0);
  v.x = m[0][0];
  v.y = m[1][0];
  v.z = m[2][0];
  v.w = m[3][0];
  v.u = m[4][0];
  v.t = m[5][0];
  return v;
}

void logMatrix(float[][] m){
  int cols = m[0].length; 
  int rows = m.length;
  println(rows + "x" + cols);
  println("----------------");
  for (int i = 0; i < rows; i++){
    for (int j = 0; j < cols; j++){
      print(m[i][j] + " ");
    }
    println();
  }
  println();
}

PVector matmul3(float[][]a, P4Vector b){
  float[][] m = vec4ToMatrix(b);
  return matrixToVec(matmul(a, m));
}

P4Vector matmul(float[][]a, P4Vector b, boolean dim4){
  float[][] m = vec4ToMatrix(b);
  //logMatrix(a);
  //logMatrix(m);
  return matrixToVec4(matmul(a, m));
}

P4Vector matmul5D_P(float[][]a, P5Vector b, boolean dim4){
  float[][] m = vec5ToMatrix(b);
  //logMatrix(a);
  //logMatrix(m);
  return matrixToVec4(matmul(a, m));
}


P5Vector matmul5D_R(float[][]a, P5Vector b, boolean dim5){
  float[][] m = vec5ToMatrix(b);
  return matrixToVec5(matmul(a, m));
}


P5Vector matmul6D_P(float[][]a, P6Vector b, boolean dim5){
  float[][] m = vec6ToMatrix(b);
  return matrixToVec5(matmul(a, m));
}

P6Vector matmul6D_R(float[][]a, P6Vector b, boolean dim5){
  float[][] m = vec6ToMatrix(b);
  return matrixToVec6(matmul(a, m));
}


float [][] matmul(float[][]a, float[][]b){
  int colsA = a[0].length; 
  int rowsA = a.length;
  int colsB = b[0].length; 
  int rowsB = b.length;
  
  if(colsA != rowsB){
    println("Columns of A must match rows of B");
    return null;
  }
  float result[][] = new float [rowsA][colsB];
    for (int i = 0; i < rowsA; i++){
      for (int j = 0; j < colsB; j++){
        //Dot product pf value in col
        float sum = 0;
        for(int k = 0; k < colsA/* == rowsB*/; k++){
          sum += a[i][k] * b[k][j];
        }
        result[i][j] = sum;
      }
    }
    return result;
}
