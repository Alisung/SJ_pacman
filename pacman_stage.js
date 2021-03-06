class Navigation {
  constructor() {
    this.navigation2 = [
      // 각 칸의 크기를 20*20 으로 본다.
      // 0 = 동전
      // 1 = 빈공간
      // 2 = 벽

      [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
      [2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2],
      [2, 0, 2, 2, 0, 2, 2, 0, 2, 0, 2, 2, 0, 2, 2, 0, 2],
      [2, 0, 2, 2, 0, 2, 2, 0, 2, 0, 2, 2, 0, 2, 2, 0, 2],
      [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
      [2, 2, 2, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 2, 2, 2],
      [2, 0, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 0, 2],
      [2, 0, 2, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 2, 0, 2],
      [2, 0, 0, 0, 0, 2, 0, 2, 2, 2, 0, 2, 0, 0, 0, 0, 2],
      [2, 0, 2, 2, 0, 2, 0, 0, 2, 0, 0, 2, 0, 2, 2, 0, 2],
      [2, 0, 0, 2, 0, 2, 2, 0, 2, 0, 2, 2, 0, 2, 2, 0, 2],
      [2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2],
      [2, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 2],
      [2, 0, 2, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 2, 0, 2],
      [2, 0, 2, 2, 2, 2, 2, 0, 2, 0, 2, 2, 2, 2, 2, 0, 2],
      [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
      [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    ];
    //최단경로를 -1로 표시하기 위한 배열
    this.navigation_background = [
      // 각 칸의 크기를 20*20 으로 본다.
      // 0 = 동전
      // 1 = 빈공간
      // 2 = 벽

      [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
      [2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2],
      [2, 0, 2, 2, 0, 2, 2, 0, 2, 0, 2, 2, 0, 2, 2, 0, 2],
      [2, 0, 2, 2, 0, 2, 2, 0, 2, 0, 2, 2, 0, 2, 2, 0, 2],
      [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
      [2, 2, 2, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 2, 2, 2],
      [2, 0, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 0, 2],
      [2, 0, 2, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 2, 0, 2],
      [2, 0, 0, 0, 0, 2, 0, 2, 2, 2, 0, 2, 0, 0, 0, 0, 2],
      [2, 0, 2, 2, 0, 2, 0, 0, 2, 0, 0, 2, 0, 2, 2, 0, 2],
      [2, 0, 0, 2, 0, 2, 2, 0, 2, 0, 2, 2, 0, 2, 0, 0, 2],
      [2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2],
      [2, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 2],
      [2, 0, 2, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 2, 0, 2],
      [2, 0, 2, 2, 2, 2, 2, 0, 2, 0, 2, 2, 2, 2, 2, 0, 2],
      [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
      [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    ];
  }
}

// 게임 스테이지
let navigation = [
  // 각 칸의 크기를 20*20 으로 본다.
  // 0 = 동전
  // 1 = 빈공간
  // 2 = 벽

  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 2, 2, 0, 2, 2, 0, 2, 0, 2, 2, 0, 2, 2, 0, 2],
  [2, 0, 2, 2, 0, 2, 2, 0, 2, 0, 2, 2, 0, 2, 2, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 2, 2, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 2, 2, 2],
  [2, 0, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 0, 2],
  [2, 0, 2, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 2, 0, 2],
  [2, 0, 0, 0, 0, 2, 0, 2, 2, 2, 0, 2, 0, 0, 0, 0, 2],
  [2, 0, 2, 2, 0, 2, 0, 0, 2, 0, 0, 2, 0, 2, 2, 0, 2],
  [2, 0, 0, 2, 0, 2, 2, 0, 2, 0, 2, 2, 0, 2, 0, 0, 2],
  [2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2],
  [2, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 2],
  [2, 0, 2, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 2, 0, 2],
  [2, 0, 2, 2, 2, 2, 2, 0, 2, 0, 2, 2, 2, 2, 2, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
];
// BFS 탐색을 위한 배열
