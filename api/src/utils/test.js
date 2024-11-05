let arr = [
  [2, 4],
  [3, 4],
  [3, 4],
  [3, 3],
  [3, 3],
  [3, 3],

  [3, 3],
  [2, 3],
  [3, 3],
  [3, 2],
  [3, 4],
  [3, 1],

  [2, 4],
  [3, 3],
  [3, 4],
  [3, 4],
  [3, 1],
  [3, 3],
  [2, 3],

  [2, 3],
  [1, 3],
  [3, 3],
  [3, 4],
  [3, 3],
  [3, 4],
  [3, 3],
  [3, 4],

  [2, 3],
  [2, 4],
  [2, 4],
  [2, 3],
  [3, 3],
  [3, 4],
  [4, 4],

  [2, 3],
  [3, 4],
  [3, 4],
  [3, 4],
  [3, 3],
  [3, 4],
  [3, 4],
  [3, 4],

  [2, 4],
  [3, 4],
  [3, 4],
  [3, 4],

  [6, 4],
];


// Tính tổng số chỉ, tổng điểm và điểm trung bình
let totalCredit = 0;
let totalPoint = 0;

for (let i = 0; i < arr.length; i++) {
  let credit = arr[i][0];
  let point = arr[i][1];
  totalCredit += credit;
  totalPoint += credit * point;
}

let averagePoint = totalPoint / totalCredit;

console.log("Tổng số chỉ:", totalCredit);
console.log("Tổng điểm:", totalPoint);
console.log("Điểm trung bình hệ số 4:", averagePoint);