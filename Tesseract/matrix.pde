float[][] vecToMatrix(P4Vector v){
  float[][] m = new float[4][1];
  m[0][0] = v.x;
  m[1][0] = v.y;
  m[2][0] = v.z;
  m[3][0] = v.z;
  return m;
};

PVector matrixToVec(float [][] m){
  PVector v = new PVector();
  v.x = m[0][0];
  v.y = m[1][0];
  if(m.length > 2){
    v.z = m[2][0];
  }
  return v;
};

//float [][] projection = {
//  {1, 0, 0}, 
//  {0, 1, 0}
//};

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
};

float [][] matmul(float[][]a, float[][]b){
  int colsA = a[0].length; 
  int rowsA = a.length;
  int colsB = b[0].length; 
  int rowsB = b.length;
  
  if(colsA != rowsB){
    println("Columns of A must match rows of B");
    return null;
  }
  float [][] result = new float [rowsA][colsB];
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
};



float[][] matmul(float[][]a, P4Vector b){
  float[][] m = vecToMatrix(b);
  return matmul(a, m);
};


//More simply...
PVector MatrixOperation(float[][]a, P4Vector b){
  float[][] m = vecToMatrix(b);
  //logMatrix(a);
  //logMatrix(m);
  float[][] result =  matmul(a, m);
  //logMatrix(result);
  return matrixToVec(result);
};
