// 적
// 적 위치
// BFS 알고리즘으로 현재 플레이어 위치를 탐색해 최단 거리로 이동할 예정.
// 적은 시간이 지날때 마다 자동으로 이동한다.
class Anemy extends Navigation {
  constructor(anmeyx, anmeyy, color) {
    super();
    this.a = anmeyx;
    this.b = anmeyy;
    this.a2;
    this.b2;
    this.count = 0;
    this.color = color;

    //적의 위치값 배열
    this.arx = [(this.a / 10 - 1) / 2 + 1];
    this.ary = [(this.b / 10 - 1) / 2 + 1];

    // 최단경로 찾기위한 count
    this.arz = [3];

    this.arr_x = 0;
    this.arr_y = 0;
    this.arr_z = 0;

    this.navigation_x;
    this.navigation_y;
    //움직이기 위한 배열 값 변수
    this.anemy_x = 0;
    this.anemy_y = 0;
    this.Animation_move;
    //최단경로를 찾은 뒤 -1로 변경시켜주기 위해 필요한 변수
    this.i = 0;
    this.j = 0;
    this.bool_BFS = true;
    // 10, 30, 50 .. 일 때 재탐색을 하기 위한 변수

    this.Anemy_BFS_Cycle = false;
  }

  draw = () => {
    context2.beginPath();
    context2.fillStyle = this.color;
    context2.arc(this.a, this.b, 8, 0, Math.PI * 2, true);
    context2.closePath();
    context2.fill();
  };
  // 시간에 따라 this a,b 값을 변경시키면서 조건 10,30 .. 숫자들
  // this.navigation_background 배열값이 -1인 방향으로 움직이도록
  // X,Y는 적의 캔버스 좌표 - 변동가능
  //move_anemy(i,j); {
  //i++;
  //j++;
  //}

  //최단거리로 이동하기 위한 route
  //this.navigation2 배열에서 this.arr.z의 값이 있는 배열 값을 navigation 으로 받아와
  // X,Y는 플레이어의 위치 값
  //
  Anemy_route = (X, Y) => {
    //최초값
    this.j = X;
    this.i = Y;
    //25-1
    // for(let j = this.j; j<=(this.a/10-1)/2+1;) {
    // 	for(let i = this.i; i<=(this.b/10-1)/2+1;) {

    // 	}
    // }
    if (this.navigation_background[this.i][this.j] == 3) {
      this.navigation_background[this.i][this.j] = -1;
      return;
      //종료
    }
    //상
    if (
      this.navigation_background[this.i][this.j] - 1 ==
      this.navigation_background[this.i - 1][this.j]
    ) {
      this.navigation_background[this.i][this.j] = -1;

      this.Anemy_route(this.j, this.i - 1);
    }
    //하
    if (
      this.navigation_background[this.i][this.j] - 1 ==
      this.navigation_background[this.i + 1][this.j]
    ) {
      this.navigation_background[this.i][this.j] = -1;

      this.Anemy_route(this.j, this.i + 1);
    }
    //좌
    if (
      this.navigation_background[this.i][this.j] - 1 ==
      this.navigation_background[this.i][this.j - 1]
    ) {
      this.navigation_background[this.i][this.j] = -1;
      this.Anemy_route(this.j - 1, this.i);
    }
    //우
    if (
      this.navigation_background[this.i][this.j] - 1 ==
      this.navigation_background[this.i][this.j + 1]
    ) {
      this.navigation_background[this.i][this.j] = -1;
      this.Anemy_route(this.j + 1, this.i);
    }
  };

  arr_capy = () => {
    for (let i = 0; i < 17; i++) {
      for (let j = 0; j < 17; j++) {
        this.navigation2[i][j] = navigation[i][j];
        this.navigation_background[i][j] = navigation[i][j];
      }
    }
  };
  // 플레이어 탐색
  // 만약 this.a, this.b가 10, 30, 50 .. 의 값이면 배열의 초기화 및 재탐색
  Anemy_BFS = () => {
    if (
      (this.b / 10) % 2 == 1 &&
      this.b % 10 == 0 &&
      (this.a / 10) % 2 == 1 &&
      this.a % 10 == 0
    ) {
      this.arr_capy();
      if (this.arx.length == 0) {
        return;
      }

      if (this.bool_BFS == true) {
        //탐색
        while (this.arx.length != 0) {
          this.arr_x = this.arx.shift();
          this.arr_y = this.ary.shift();
          this.arr_z = this.arz.shift();
          //x = 150 y = 290
          this.navigation2[this.arr_y][this.arr_x] = 3;
          this.navigation_background[this.arr_y][this.arr_x] = this.arr_z;

          // 배열로 탐색 - 적배열값 arr_x, arr_y == 플레이어 배열값 x,y 일때 탐색의 마지막
          // 배열값 변경전 좌표값 this.a, this.b, x, y
          // x,y는 계속 움직여야 하기 때문에 올림,내림 값을 가지고 탐색해야 함
          if (
            this.arr_x == Math.round((x / 10 - 1) / 2 + 1) &&
            this.arr_y == Math.round((y / 10 - 1) / 2 + 1)
          ) {
            this.bool_BFS = false;
            this.navigation2[this.arr_y][this.arr_x] = 3;
            //console.log(x,y);
            //stage_draw();
            //console.log(this.arr_x,this.arr_y,this.arr_z,(x/10-1)/2+1,(y/10-1)/2+1);
            break;
          }
          //상
          if (
            this.navigation2[this.arr_y - 1][this.arr_x] == 0 ||
            this.navigation2[this.arr_y - 1][this.arr_x] == 1
          ) {
            this.arx.push(this.arr_x);
            this.ary.push(this.arr_y - 1);
            this.arz.push(this.arr_z + 1);
          }
          //하
          if (
            this.navigation2[this.arr_y + 1][this.arr_x] == 0 ||
            this.navigation2[this.arr_y + 1][this.arr_x] == 1
          ) {
            this.arx.push(this.arr_x);
            this.ary.push(this.arr_y + 1);
            this.arz.push(this.arr_z + 1);
          }
          //좌
          if (
            this.navigation2[this.arr_y][this.arr_x - 1] == 0 ||
            this.navigation2[this.arr_y][this.arr_x - 1] == 1
          ) {
            this.arx.push(this.arr_x - 1);
            this.ary.push(this.arr_y);
            this.arz.push(this.arr_z + 1);
          }
          //우
          if (
            this.navigation2[this.arr_y][this.arr_x + 1] == 0 ||
            this.navigation2[this.arr_y][this.arr_x + 1] == 1
          ) {
            this.arx.push(this.arr_x + 1);
            this.ary.push(this.arr_y);
            this.arz.push(this.arr_z + 1);
          }
          //console.log(this.arr_x,this.arr_y, this.arr_z, (x/10-1)/2+1,(y/10-1)/2+1);
          //this.count++;
          //BFS_STOP = setTimeout(this.Anemy_BFS.bind(this), 1);
          //stage_draw();
        }
      }
      this.Anemy_route(this.arr_x, this.arr_y);

      this.move_anemy();
    }
  };
  game_over2 = () => {
    //점과 점 사이의 거리 공식을 이용
    // square root{(this.a - x)^2 + (this.b-y)^2}
    // 반지름 = 8, 두 중점사이의 거리가 16미만일때
    // 게임 오버
    if (16 > Math.sqrt(Math.pow(this.a - x, 2) + Math.pow(this.b - y, 2))) {
      return true;
    }
  };

  move_anemy = () => {
    this.anemy_x = (this.a / 10 - 1) / 2 + 1; // 150 -> 8
    this.anemy_y = (this.b / 10 - 1) / 2 + 1; // 110 -> 5
    //game over
    if (this.game_over2()) {
      game_over = true;

      alert("game_over");
      cancelAnimationFrame(Animation_move);
      if (player_down == true) {
        cancelAnimationFrame(Animation_down);
      }
      if (player_up == true) {
        cancelAnimationFrame(Animation_up);
      }
      if (player_left == true) {
        cancelAnimationFrame(Animation_left);
      }
      if (player_right == true) {
        cancelAnimationFrame(Animation_right);
      }
      return;
    }

    // 재탐색
    if (
      (this.b / 10) % 2 == 1 &&
      this.b % 10 == 0 &&
      (this.a / 10) % 2 == 1 &&
      this.a % 10 == 0 &&
      this.Anemy_BFS_Cycle == true
    ) {
      this.Anemy_BFS_Cycle = false;
      this.Anemy_BFS();
    }
    if (
      (this.b / 10) % 2 == 1 &&
      this.b % 10 == 0 &&
      (this.a / 10) % 2 == 1 &&
      this.a % 10 == 0 &&
      this.Anemy_BFS_Cycle == false
    ) {
      // 좌표값이 정수 일때
      //상
      if (this.navigation_background[this.anemy_y - 1][this.anemy_x] == -1) {
        this.navigation_background[this.anemy_y][this.anemy_x] = -2;
        this.b -= 1;
      }
      //하
      if (this.navigation_background[this.anemy_y + 1][this.anemy_x] == -1) {
        this.navigation_background[this.anemy_y][this.anemy_x] = -2;
        this.b += 1;
      }
      //좌
      if (this.navigation_background[this.anemy_y][this.anemy_x - 1] == -1) {
        this.navigation_background[this.anemy_y][this.anemy_x] = -2;
        this.a -= 1;
      }
      //우
      if (this.navigation_background[this.anemy_y][this.anemy_x + 1] == -1) {
        this.navigation_background[this.anemy_y][this.anemy_x] = -2;
        this.a += 1;
      }
      //좌표값이 소수일때
    } else {
      //이 부분은 중첩 되는 부분이 있어 수정 할 필요가 있음.
      //상
      if (
        this.navigation_background[Math.floor(this.anemy_y)][
          Math.floor(this.anemy_x)
        ] == -1
      ) {
        this.b -= 1;
      }
      //하
      if (
        this.navigation_background[Math.ceil(this.anemy_y)][
          Math.floor(this.anemy_x)
        ] == -1
      ) {
        this.b += 1;
      }
      //좌
      if (
        this.navigation_background[Math.ceil(this.anemy_y)][
          Math.floor(this.anemy_x)
        ] == -1
      ) {
        this.a -= 1;
      }
      //우
      if (
        this.navigation_background[Math.ceil(this.anemy_y)][
          Math.ceil(this.anemy_x)
        ] == -1
      ) {
        this.a += 1;
      }
      if (
        (this.b / 10) % 2 == 1 &&
        this.b % 10 == 0 &&
        (this.a / 10) % 2 == 1 &&
        this.a % 10 == 0
      ) {
        this.Anemy_BFS_Cycle = true;
        this.bool_BFS = true;

        //적의 위치값 배열 초기화
        this.arx.length = 0;
        this.ary.length = 0;
        this.arz.length = 0;
        // 큐 초기화
        this.arx = [(this.a / 10 - 1) / 2 + 1];
        this.ary = [(this.b / 10 - 1) / 2 + 1];

        // 최단경로 찾기위한 count
        this.arz = [3];
      }
    }

    //console.log(this.a, this.b);
    cancelAnimationFrame(Animation_move);
    Animation_move = requestAnimationFrame(this.move_anemy);
    stage_draw();
  };
}
let Animation_move;
let cell_size = 20; // 팩맨 동전이 들어갈 박스, 벽 한칸 사이즈
let R_Dubble_click_ctrl = 0;
let L_Dubble_click_ctrl = 0;
let D_Dubble_click_ctrl = 0;
let U_Dubble_click_ctrl = 0;
// 이동 제어
let control_key = 0;
//플레이어의 위치
let x = 130;
let y = 290;

//상하좌우에 한칸+ 해준 다음 배열값을 비교해 만약 2가 나오면 R_control_key =1;
// 2가 나오지 않으면 R_control_key = 0;
let R_control_key = 0;
let L_control_key = 0;
let U_control_key = 0;
let D_control_key = 0;
let i_;
let j_;

//게임 종료에 쓰이는 변수
let player_up = false;
let player_down = false;
let player_left = false;
let player_right = false;
let eat_count = 0;
let game_over = false;
// navigation 배열의 주소
let i = 0;
let j = 0;
let canvas;
let context;
let context2;
let turn_contral;
let spot_x;
let spot_y;
// 방향을 꺾을 때 key를 누른 지점?
let x_spot_navi;
let y_spot_navi;
let BFS_STOP;
let Anemy1 = new Anemy(150, 130, "red");
//let Anemy2 = new Anemy(10, 10, "white");
let setTimeout_ctrl = 0;

window.onload = function () {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");
  context2 = canvas.getContext("2d");
  stage_draw();

  //setTimeout(() => {

  //}, 0);
  //setTimeout(() => {
  Anemy1.Anemy_BFS();
  //Anemy2.Anemy_BFS();

  //}, 0);

  document.getElementById("right").onclick = function () {
    // 게임오버
    if (game_over == true) {
      return;
    }
    player_right = true;
    player_down = false;
    player_left = false;
    player_up = false;
    // spot_x = x;
    // spot_y = y;
    //console.log(spot_x,spot_y);
    function turn_right() {
      // spot_x = x;
      // spot_y = y;
      crash_stop(x, y);
      cancelAnimationFrame(turn_contral);
      if (control_key == 0 && R_control_key == 0) {
        if (
          (y / 10) % 2 == 1 &&
          y % 10 == 0 &&
          (x / 10) % 2 == 1 &&
          x % 10 == 0
        ) {
          Cancel_move();

          if (R_Dubble_click_ctrl == 0) {
            right_move();
          }
        }
      }
      if (
        (y / 10) % 2 == 1 &&
        y % 10 == 0 &&
        (x / 10) % 2 == 1 &&
        x % 10 == 0
      ) {
        x_spot_navi = (x / 10 - 1) / 2 + 1;
        y_spot_navi = (y / 10 - 1) / 2 + 1;

        if (
          x >= canvas.width - 10 ||
          navigation[y_spot_navi][x_spot_navi + 1] == 2
        ) {
          player_right = false;
          return;
        }
      }
      // spot_x++;

      turn_contral = requestAnimationFrame(turn_right);
      //console.log(spot_x,spot_y,x,y);
    }
    turn_right();
  };

  document.getElementById("down").onclick = function () {
    // 게임오버
    if (game_over == true) {
      return;
    }
    player_up = false;
    player_down = true;
    player_left = false;
    player_right = false;

    function turn_down() {
      crash_stop(x, y);

      cancelAnimationFrame(turn_contral);
      // 충돌검사 후 10, 30, 50 .. 값이 되면 이동가능한 상태 D_control_key가 0이 되는 값만 이동 가능함
      // 만약 left 키를 눌러서 left로 가는 에니메이션이 반복 될 때는 함수 move_left 에서 탈출을 하지 않는 상태이고
      // down키를 누르면 바로 move_down으로 들어가는 게 아니라 지연시간을 부여한다
      // x,y값이 10, 30, 50 .. 일때 내려가도록 구현됨
      if (control_key == 0 && D_control_key == 0) {
        if (
          (y / 10) % 2 == 1 &&
          y % 10 == 0 &&
          (x / 10) % 2 == 1 &&
          x % 10 == 0
        ) {
          // 여기로 들어오면 이전에 right 이동 애니메이션은 멈추게 된다.
          // 만약에 맨처음에 down을 누르게 되면 D_Dubble_click_ctrl 의 값이 0이기 때문에
          // 멈추지 않고 down_move 함수가 실행된다.
          Cancel_move();
          // left 누른 상태에선 비활성화 단계라 이동이 가능한 상황
          if (D_Dubble_click_ctrl == 0) {
            down_move();
          }
        }
      }
      if (
        (y / 10) % 2 == 1 &&
        y % 10 == 0 &&
        (x / 10) % 2 == 1 &&
        x % 10 == 0
      ) {
        x_spot_navi = (x / 10 - 1) / 2 + 1;
        y_spot_navi = (y / 10 - 1) / 2 + 1;
        //console.log(x_spot_navi, y_spot_navi)
        // 벽이 되면 player_down을 false로 만들어 움직이지 않도록 만든다
        if (
          y >= canvas.height - 10 ||
          navigation[y_spot_navi + 1][x_spot_navi] == 2
        ) {
          player_down = false;
          return;
        }
      }

      turn_contral = requestAnimationFrame(turn_down);
    }
    turn_down();
  };

  document.getElementById("up").onclick = function () {
    // 게임오버
    if (game_over == true) {
      return;
    }
    player_up = true;
    player_down = false;
    player_left = false;
    player_right = false;

    function turn_UP() {
      crash_stop(x, y);

      cancelAnimationFrame(turn_contral);

      if (control_key == 0 && U_control_key == 0) {
        if (
          (y / 10) % 2 == 1 &&
          y % 10 == 0 &&
          (x / 10) % 2 == 1 &&
          x % 10 == 0
        ) {
          Cancel_move();
          if (U_Dubble_click_ctrl == 0) {
            up_move();
          }
        }
      }
      if (
        (y / 10) % 2 == 1 &&
        y % 10 == 0 &&
        (x / 10) % 2 == 1 &&
        x % 10 == 0
      ) {
        x_spot_navi = (x / 10 - 1) / 2 + 1;
        y_spot_navi = (y / 10 - 1) / 2 + 1;

        if (y <= 10 || navigation[y_spot_navi - 1][x_spot_navi] == 2) {
          player_up = false;

          return;
        }
      }

      turn_contral = requestAnimationFrame(turn_UP);
    }
    turn_UP();
  };

  // function selectButton(control_kyes, keys_) {
  //   let cont__ = control_kyes;
  //   if (control_key == 0 && cont__ == 0) {
  //     if (
  //       (y / 10) % 2 == 1 &&
  //       y % 10 == 0 &&
  //       (x / 10) % 2 == 1 &&
  //       x % 10 == 0
  //     ) {
  //       Cancel_move();
  //       {
  //         switch (keys_) {
  //           case 1:
  //             right_move();
  //             break;
  //           case 2:
  //             up_move();
  //             break;
  //           case 3:
  //             down_move();
  //             break;
  //           case 4:
  //             left_move();
  //             break;
  //         }
  //       }
  //     }
  //   }
  // }
  // 클릭 할 때 10, 30, 50 .. 등의 값에 맞춰서 클릭해야지 방향이 바뀌게 하기엔
  // 사용자 입장에서 너무 맞추기가 힘들기 때문에
  // 미리 클릭후 약간의 시간이 지난 뒤에 방향이 바뀌게 설정
  // onclick 함수 내에서 turn_left 함수를 반복 실행
  // 방향을 바꾸기 위한 onclick 함수
  document.getElementById("left").onclick = function () {
    // 게임오버
    if (game_over == true) {
      return;
    }
    player_up = false;
    player_down = false;
    player_left = true;
    player_right = false;

    // left 방향으로 이동하다가
    function turn_left() {
      crash_stop(x, y);

      cancelAnimationFrame(turn_contral);

      if (control_key == 0 && L_control_key == 0) {
        // 실제 x,y값이 10, 30, 50 등 방향이 전환될 수 있는 구간이 될때
        // 이동을 멈춘다
        if (
          (y / 10) % 2 == 1 &&
          y % 10 == 0 &&
          (x / 10) % 2 == 1 &&
          x % 10 == 0
        ) {
          Cancel_move();

          if (L_Dubble_click_ctrl == 0) {
            //왼쪽으로 계속 이동하는 함수
            //이 함수는 좌측을 클릭시 한 번만 실행되도록 구현됨
            left_move();
          }
        }
      }

      if (
        (y / 10) % 2 == 1 &&
        y % 10 == 0 &&
        (x / 10) % 2 == 1 &&
        x % 10 == 0
      ) {
        x_spot_navi = (x / 10 - 1) / 2 + 1;
        y_spot_navi = (y / 10 - 1) / 2 + 1;

        if (x <= 10 || navigation[y_spot_navi][x_spot_navi - 1] == 2) {
          player_left = false;
          return;
        }
      }

      turn_contral = requestAnimationFrame(turn_left);
      //console.log(spot_x,spot_y,x,y);
    }

    turn_left();
  };
};
// window onload
function stage_draw() {
  // x,y값은 각 함수에 들어가면 값이 변한다.
  // a,b 값은 적 위치
  context.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 1; i < 16; i++) {
    for (let j = 1; j < 16; j++) {
      if (navigation[i][j] == 2) {
        context.fillStyle = "#050356";
        context.fillRect(
          cell_size * (j - 1),
          cell_size * (i - 1),
          cell_size,
          cell_size
        );
      } else if (navigation[i][j] == 1) {
        if (i == 6 && (j == 14 || j == 2)) {
          context.fillStyle = "grey";
          context.fillRect(
            cell_size * (j - 1),
            cell_size * (i - 1),
            cell_size,
            cell_size
          );
        } else {
          context.fillStyle = "black";
          context.fillRect(
            cell_size * (j - 1),
            cell_size * (i - 1),
            cell_size,
            cell_size
          );
        }
        // BFS 탐색을 구현하기 위해 사용된 것
        //} else if(this.navigation_background[i][j] == -1) {
        //  	context.fillStyle = "grey"
        //   	context.fillRect(cell_size*(j-1),cell_size*(i-1),cell_size,cell_size);
        // }
        //else if(navigation[i][j] == 3) {
        //context.fillStyle = "white"
        //context.fillRect(cell_size*(j-1),cell_size*(i-1),cell_size,cell_size);
      } else if (navigation[i][j] == 0) {
        if (i == 6 && (j == 14 || j == 2)) {
          context.fillStyle = "grey";
          context.fillRect(
            cell_size * (j - 1),
            cell_size * (i - 1),
            cell_size,
            cell_size
          );
        } else {
          context.fillStyle = "black";
          context.fillRect(
            cell_size * (j - 1),
            cell_size * (i - 1),
            cell_size,
            cell_size
          );
        }
        context.beginPath();
        context.fillStyle = "yellow";
        //context.fillRect(cell_size*(j-1),cell_size*(i-1),cell_size,cell_size);
        context.arc(
          10 * (2 * (j - 1) + 1),
          10 * (2 * (i - 1) + 1),
          2,
          0,
          Math.PI * 2,
          true
        );
        context.closePath();
        context.fill();
      }
    }
  }
  // 플레이어
  context.beginPath();
  context.fillStyle = "green";
  context.arc(x, y, 8, 0, Math.PI * 2, true);
  //context2.arc(a, b, 8, 0,Math.PI * 2, false);
  context.closePath();
  context.fill();

  // 적 AI
  Anemy1.draw();
  //Anemy2.draw();
}
// 우 클릭시 오른쪽으로만 계속 이동하는 함수
function right_move() {
  //stage_draw();

  R_Dubble_click_ctrl = 1;
  control_key = 1;
  // 테두리에 닿으면 멈춤
  if (x >= canvas.width - 10) {
    control_key = 0;
    //console.log(x,y);
    return;
  } else if (x < canvas.width - 10) {
    x += 1;
    call_rocation(x, y);
    stage_draw();
    if (move_cancel()) {
      telefort();
      return;
    }
  }

  Animation_right = requestAnimationFrame(right_move);
}
// 아래 클릭시 아래쪽으로만 계속 이동하는 함수
function down_move() {
  //stage_draw();

  D_Dubble_click_ctrl = 1;
  control_key = 1;

  if (y >= canvas.height - 10) {
    control_key = 0;
    //console.log(x,y);
    return;
  } else if (y < canvas.height - 10) {
    y += 1;

    call_rocation(x, y);
    stage_draw();
    //console.log(x,y);
    //이쪽으로 들어오면 control key 가 0으로 바뀜
    if (move_cancel()) {
      telefort();
      return;
    }
  }

  Animation_down = requestAnimationFrame(down_move);
}
// 좌 클릭시 왼쪽으로만 계속 이동하는 함수
function left_move() {
  //stage_draw();

  L_Dubble_click_ctrl = 1;
  control_key = 1;

  if (x <= 10) {
    control_key = 0;
    //console.log(x,y);
    return;
  } else if (x > 10) {
    x -= 1;

    call_rocation(x, y);
    stage_draw();
    if (move_cancel()) {
      telefort();
      return;
    }
  }

  Animation_left = requestAnimationFrame(left_move);
}
function up_move() {
  //stage_draw();
  U_Dubble_click_ctrl = 1;
  control_key = 1;

  if (y <= 10) {
    control_key = 0;
    //console.log(x,y);
    return;
  } else if (y > 10) {
    y -= 1;

    call_rocation(x, y);
    stage_draw();
    if (move_cancel()) {
      telefort();
      // 10, 30, 50 ... 등 숫자가 되면
      //control_key를 0으로 만들어 움직일수 있도록 만든다.
      return;
    }
  }

  Animation_up = requestAnimationFrame(up_move);
}
// 한 칸씩 이동
function move_cancel() {
  if (
    (x == 10 || y == 10) &&
    (y / 10) % 2 == 1 &&
    y % 10 == 0 &&
    (x / 10) % 2 == 1 &&
    x % 10 == 0
  ) {
    control_key = 0;
    return true;
  }
  if ((y / 10) % 2 == 1 && y % 10 == 0 && (x / 10) % 2 == 1 && x % 10 == 0) {
    control_key = 0;
    return true;
  }
}
function telefort() {
  if (x == 270 && y == 110) {
    Anemy1.Anemy_BFS_Cycle == false;
    x = 30;
    y = 110;
    stage_draw();
    Anemy1.Anemy_BFS();
    //Anemy2.Anemy_BFS();
  } else if (x == 30 && y == 110) {
    Anemy1.Anemy_BFS_Cycle == false;
    x = 270;
    y = 110;
    stage_draw();
    Anemy1.Anemy_BFS();
    //Anemy2.Anemy_BFS();
  }
}

// 현재위치를 navigation 배열로 전달해 값을 변경, 새로운 변수에 할당
function call_rocation(X_rocation, Y_rocation) {
  if ((y / 10) % 2 == 1 && y % 10 == 0 && (x / 10) % 2 == 1 && x % 10 == 0) {
    j = (X_rocation / 10 - 1) / 2 + 1;
    i = (Y_rocation / 10 - 1) / 2 + 1;

    if (navigation[i][j] == 0 || navigation[i][j] == 3) {
      navigation[i][j] = 1;
      eat_count++;
      //console.log(eat_count);
      if (eat_count == 134) {
        cancelAnimationFrame(Animation_move);

        if (player_down == true) {
          cancelAnimationFrame(Animation_down);
        }
        if (player_up == true) {
          cancelAnimationFrame(Animation_up);
        }
        if (player_left == true) {
          cancelAnimationFrame(Animation_left);
        }
        if (player_right == true) {
          cancelAnimationFrame(Animation_right);
        }
        alert("끝!");
      }
    }
  }
}
// -> 이동하는 중에 down을 클릭하면  ->를 캔슬하고 down 하는 방법.
// 각 버튼을 누를 때 cancel_move에 접근 하고 다시 자기 함수를 끝내는 방법.
function Cancel_move() {
  call_rocation(x, y);
  if (R_Dubble_click_ctrl == 1) {
    R_Dubble_click_ctrl = 0;
    cancelAnimationFrame(Animation_right);
  }
  if (L_Dubble_click_ctrl == 1) {
    L_Dubble_click_ctrl = 0;
    cancelAnimationFrame(Animation_left);
  }
  if (D_Dubble_click_ctrl == 1) {
    D_Dubble_click_ctrl = 0;
    cancelAnimationFrame(Animation_down);
  }
  if (U_Dubble_click_ctrl == 1) {
    U_Dubble_click_ctrl = 0;
    cancelAnimationFrame(Animation_up);
  }
}

function crash_stop(x_point, y_point) {
  // 10 = 1, 30 = 2 , ... 배열값을 정확히 찾기 위해서 조건을 붙여준다
  if ((y / 10) % 2 == 1 && y % 10 == 0 && (x / 10) % 2 == 1 && x % 10 == 0) {
    j_ = (x_point / 10 - 1) / 2 + 1;
    i_ = (y_point / 10 - 1) / 2 + 1;
    //console.log(i_,j_);
  }
  if (navigation[i_ - 1][j_] == 2) {
    U_control_key = 1;
  } else if (
    navigation[i_ - 1][j_] == 1 ||
    navigation[i_ - 1][j_] == 0 ||
    navigation[i_ - 1][j_] == 3
  ) {
    U_control_key = 0;
  }
  if (navigation[i_][j_ - 1] == 2) {
    L_control_key = 1;
  } else if (
    navigation[i_][j_ - 1] == 1 ||
    navigation[i_][j_ - 1] == 0 ||
    navigation[i_][j_ - 1] == 3
  ) {
    L_control_key = 0;
  }
  if (navigation[i_ + 1][j_] == 2) {
    D_control_key = 1;
  } else if (
    navigation[i_ + 1][j_] == 1 ||
    navigation[i_ + 1][j_] == 0 ||
    navigation[i_ + 1][j_] == 3
  ) {
    D_control_key = 0;
  }
  if (navigation[i_][j_ + 1] == 2) {
    R_control_key = 1;
  } else if (
    navigation[i_][j_ + 1] == 1 ||
    navigation[i_][j_ + 1] == 0 ||
    navigation[i_][j_ + 1] == 3
  ) {
    R_control_key = 0;
  }
}

// function anemy_move_arr_copy2() {
// 	for(let i =0; i<anemy_move_arr.length; i++) {
// 		anemy_move_arr_copy[i]= anemy_move_arr[i];
// 	}
// }

//
//

// dfs

// function Anemy_DFS(j_,i_) {

// anemy_move_arr.push(i_);
// anemy_move_arr.push(j_);

//console.log(anemy_move_arr);
// if(this.navigation2[i_][j_] == 2 || this.navigation2[i_][j_] ==3) {
// 	return;
// }
// if(i_ == k_anemy && j_ == l_anemy) {
// 	anemy_move_arr_copy2();
// 	//console.log(anemy_move_arr_copy);
// 	return;
// }
// this.navigation2[i_][j_] = 3;
//console.log(i_,j_);
// 각 위치를 비교해 사용 제한을 주는 방법으로 길찾기
// Anemy_DFS(j_,i_-1); //상
// Anemy_DFS(j_,i_+1); //하
// Anemy_DFS(j_-1,i_); //좌
// Anemy_DFS(j_+1,i_); //우
//}
