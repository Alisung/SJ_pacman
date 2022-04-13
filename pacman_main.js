// 적
	// 적 위치
	// BFS 알고리즘으로 현재 플레이어 위치를 탐색해 최단 거리로 이동할 예정.
	// 적은 시간이 지날때 마다 자동으로 이동한다. 상하좌우를 모두 비교
	// 
class Anemy extends Navigation {

	constructor(anmeyx,anmeyy,color) {
		super();
		this.a = anmeyx;
		this.b = anmeyy;
		this.a2;
		this.b2;
		this.count = 0;
		this.color = color;

		//적의 위치값 배열
		this.arx = [(this.a/10-1)/2+1];
		this.ary = [(this.b/10-1)/2+1];

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
		this.Anemy_BFS_Cycle = false;
	}

	draw =() => {
		context2.beginPath();
		context2.fillStyle = this.color;
		context2.arc(this.a, this.b, 8, 0, Math.PI * 2, true);
		context2.closePath();
		context2.fill();
	}
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
	Anemy_route =(X,Y)=> {
		//최초값
		this.j = X;
		this.i = Y;
		//25-1
		// for(let j = this.j; j<=(this.a/10-1)/2+1;) {
		// 	for(let i = this.i; i<=(this.b/10-1)/2+1;) {

		// 	}
		// }
		if(this.navigation_background[this.i][this.j] == 3) {
			this.navigation_background[this.i][this.j] = -1;
			return;
			//종료
		}
		//상
		if(this.navigation_background[this.i][this.j]-1 == this.navigation_background[this.i-1][this.j]) {
			this.navigation_background[this.i][this.j] =-1;
			
			this.Anemy_route(this.j,this.i-1);
			
		}
		//하
		if(this.navigation_background[this.i][this.j]-1 == this.navigation_background[this.i+1][this.j]) {
			this.navigation_background[this.i][this.j] =-1;
			
			this.Anemy_route(this.j,this.i+1);
		}
		//좌
		if(this.navigation_background[this.i][this.j]-1 == this.navigation_background[this.i][this.j-1]) {
			this.navigation_background[this.i][this.j] =-1;
			this.Anemy_route(this.j-1,this.i);
		}
		//우
		if(this.navigation_background[this.i][this.j]-1 == this.navigation_background[this.i][this.j+1]) {
			this.navigation_background[this.i][this.j] =-1;
			this.Anemy_route(this.j+1,this.i);
		}
	}
	arr_capy = () => {
		for(let i =0; i<17; i++) {
			for(let j = 0; j<17; j++) {
				this.navigation2[i][j]=navigation[i][j];
				this.navigation_background[i][j] = navigation[i][j];
			}
		}
	}
	// 플레이어 탐색
	// 만약 this.a, this.b가 10, 30, 50 .. 의 값이면 배열의 초기화 및 재탐색
	Anemy_BFS = () => {
		if((((this.b/10)%2 == 1 && this.b%10 == 0) && ((this.a/10)%2 == 1 && this.a%10 ==0 ))) {
			this.arr_capy();
			if(this.arx.length == 0) {
				
				return;
			}
			
			if(this.bool_BFS == true) {
				//탐색
				while(this.arx.length != 0) {
					
					this.arr_x = this.arx.shift();
					this.arr_y = this.ary.shift();
					this.arr_z = this.arz.shift();
					//x = 150 y = 290
					this.navigation2[this.arr_y][this.arr_x] =3;
					this.navigation_background[this.arr_y][this.arr_x] = this.arr_z;
	
					// 배열로 탐색 - 적배열값 arr_x, arr_y == 플레이어 배열값 x,y 일때 탐색의 마지막
					// 배열값 변경전 좌표값 this.a, this.b, x, y
					// x,y는 계속 움직여야 하기 때문에 올림,내림 값을 가지고 탐색해야 함
					if(this.arr_x == Math.round((x/10-1)/2+1) && this.arr_y== Math.round((y/10-1)/2+1)){
						this.bool_BFS = false;
						this.navigation2[this.arr_y][this.arr_x] =3;
						//console.log(x,y);
						//stage_draw();
						//console.log(this.arr_x,this.arr_y,this.arr_z,(x/10-1)/2+1,(y/10-1)/2+1);
						break;
	
					}
					//상
					if(this.navigation2[this.arr_y-1][this.arr_x] == 0 || this.navigation2[this.arr_y-1][this.arr_x] == 1 ) {
						this.arx.push(this.arr_x);
						this.ary.push(this.arr_y-1);
						this.arz.push(this.arr_z+1);
					}
					//하
					if(this.navigation2[this.arr_y+1][this.arr_x] == 0 || this.navigation2[this.arr_y+1][this.arr_x] == 1 ) {
						this.arx.push(this.arr_x);
						this.ary.push(this.arr_y+1);
						this.arz.push(this.arr_z+1);
					}
					//좌
					if(this.navigation2[this.arr_y][this.arr_x-1] == 0 || this.navigation2[this.arr_y][this.arr_x-1] == 1 ) {
						this.arx.push(this.arr_x-1);
						this.ary.push(this.arr_y);
						this.arz.push(this.arr_z+1);
					}
					//우
					if(this.navigation2[this.arr_y][this.arr_x+1] == 0 || this.navigation2[this.arr_y][this.arr_x+1] == 1 ) {
						this.arx.push(this.arr_x+1);
						this.ary.push(this.arr_y);
						this.arz.push(this.arr_z+1);
					}
					//console.log(this.arr_x,this.arr_y, this.arr_z, (x/10-1)/2+1,(y/10-1)/2+1);
					//this.count++;
					//BFS_STOP = setTimeout(this.Anemy_BFS.bind(this), 1);
					//stage_draw();
				}
	
			}
			this.Anemy_route(this.arr_x,this.arr_y);
			
			this.move_anemy();
				
			
		}
		
	
	}
	game_over =() => {
		// 12가지 경우
		// 계속 수정 예정
		//플레이어가 up 할때 - y 값 10의 자리 내림
		//플레이어가 down 할때- y 값 10의 자리 올림
		//플레이어가 left 할때- x 값 10의 자리 내림
		//플레이어가 right 할때- x 값 10의 자리 올림
		
		//멈췄을때
		if(player_down == false && player_left ==false && player_right == false && player_up ==false) {
			//위로 올라올떄
			if(Math.floor((this.b/10)*10 == y+10) && (Math.floor(this.a/10)*10 == Math.floor(x/10)*10)) {
				
				return true;
			}
			//아래로 내려올때
			if(Math.ceil((this.b/10)*10 == y-10) && (Math.floor(this.a/10)*10 == Math.floor(x/10)*10)) {
				return true;
			}
			//왼쪽으로 올때
			if(Math.floor((this.a/10)*10 == x+10) && (Math.floor(this.b/10)*10 == Math.ceil(y/10)*10)) {
				return true;
			}
			//오른쪽으로 올때s
			if(Math.ceil((this.a/10)*10 == x-10) && (Math.floor(this.b/10)*10 == Math.ceil(y/10)*10)) {
				return true;
			}
		}
		//상
		// y축만 변화
		if(player_up == true) {
			// up - down
			if(Math.round(this.b/10)*10 == Math.round(y/10)*10 && (Math.floor(this.a/10)*10 == Math.floor(x/10)*10)) {
			
				return true;
			}
			// up - left
			if(Math.floor(this.b/10)*10 == Math.floor(y/10)*10 && (Math.floor(this.a/10)*10 == Math.floor(x/10)*10)) {
			
				return true;
			}
			// up - right
			if(Math.ceil(this.b/10)*10 == Math.floor(y/10)*10 && (Math.ceil(this.a/10)*10 == Math.floor(x/10)*10)) {
			
				return true;
			}
		}
		
		//하
		// y축만 변화
		if(player_down == true) {
			// down - up
			if(Math.round(this.b/10)*10 == Math.round(y/10)*10 && (Math.floor(this.a/10)*10 == Math.floor(x/10)*10)) {
			
				return true;
			}
			//down - left
			if(Math.floor(this.b/10)*10 == Math.ceil(y/10)*10 && (Math.floor(this.a/10)*10 == Math.floor(x/10)*10)) {
				return true;
			}
			//down - right
			if(Math.ceil(this.b/10)*10 == Math.ceil(y/10)*10 && (Math.ceil(this.a/10)*10 == Math.floor(x/10)*10)) {
			
				return true;
			}
		}
		//좌
		// x축만 변화
		if(player_left == true) {
			//left - up
			if(Math.ceil(this.a/10)*10 == Math.floor(x/10)*10 && (Math.floor(this.b/10)*10 == Math.ceil(y/10)*10)) {
				
				return true;
			}
			//left - down
			if(Math.ceil(this.a/10)*10 == Math.round(x/10)*10 && (Math.ceil(this.b/10)*10 == Math.ceil(y/10)*10)) {
			
				return true;
			}
			//left - right
			if(Math.round(this.a/10)*10 == Math.round(x/10)*10 && (Math.floor(this.b/10)*10 == Math.ceil(y/10)*10)) {
			
				return true;
			}
		}
		
		//우
		if(player_right == true) {
			//right - up
			if(Math.floor(this.a/10)*10 == Math.ceil(x/10)*10 && (Math.floor(this.b/10)*10 == Math.ceil(y/10)*10)) {
				
				return true;
			}
			//right - down
			if((Math.ceil(this.a/10)*10 == Math.ceil(x/10)*10) && (Math.ceil(this.b/10)*10 == Math.ceil(y/10)*10)) {
			
				return true;
			}
			//right - left
			if(Math.round((this.a/10)*10 == Math.round(x/10)*10) && (Math.floor(this.b/10)*10 == Math.ceil(y/10)*10)) {
			
				return true;
			}
		}
		
	}
	move_anemy =()  => {
		
		
		this.anemy_x = (this.a/10-1)/2+1; // 150 -> 8
		this.anemy_y = (this.b/10-1)/2+1; // 110 -> 5
		//적의 좌표 != 플레이어 좌표
		//적의 좌표 == 플레이어 좌표의 근사값 ceil(), floor()
		//game over
		
		if(this.game_over()) {
			
			game_over = true;
			
			console.log(this.a,this.b,x,y);
			alert("game_over");
			cancelAnimationFrame(Animation_move);
			if(player_down == true) {
				cancelAnimationFrame(Animation_down);
			}
			if(player_up == true) {
				cancelAnimationFrame(Animation_up);
			}
			if(player_left == true) {
				cancelAnimationFrame(Animation_left);
			}
			if(player_right == true) {
				cancelAnimationFrame(Animation_right);
			}
			return;
		}
		
		//if (Anemy_BFS_Cycle == false)
		// 좌표 변화 
		//if (Anemy_BFS_Cycle == true)
		// Anemy_BFS_();
		// 다시 true로 만들어주는 지점은. 110+0.5 일때?
		// 재탐색
		if((((this.b/10)%2 == 1 && this.b%10 == 0) && ((this.a/10)%2 == 1 && this.a%10 ==0 )) && this.Anemy_BFS_Cycle == true) {
			this.Anemy_BFS_Cycle = false;
			this.Anemy_BFS();
		}
		if((((this.b/10)%2 == 1 && this.b%10 == 0) && ((this.a/10)%2 == 1 && this.a%10 ==0 ))&& this.Anemy_BFS_Cycle == false) {
			// 좌표값이 정수 일때
			//상
			if(this.navigation_background[this.anemy_y-1][this.anemy_x] == -1) {
				this.navigation_background[this.anemy_y][this.anemy_x] = -2;
				this.b -= 1;
			}
			//하
			if(this.navigation_background[this.anemy_y+1][this.anemy_x] == -1) {
				this.navigation_background[this.anemy_y][this.anemy_x] = -2;
				this.b += 1;
			}
			//좌
			if(this.navigation_background[this.anemy_y][this.anemy_x-1] == -1) {
				this.navigation_background[this.anemy_y][this.anemy_x] = -2;
				this.a -= 1;
			}
			//우
			if(this.navigation_background[this.anemy_y][this.anemy_x+1] == -1) {
				this.navigation_background[this.anemy_y][this.anemy_x] = -2;
				this.a += 1;
			}
			//좌표값이 소수일때
		}else {
			//이 부분은 중첩 되는 부분이 있어 수정 할 필요가 있음.
			//상
			if(this.navigation_background[Math.floor(this.anemy_y)][Math.floor(this.anemy_x)] == -1) {
				this.b-=1;
			}
			//하
			if(this.navigation_background[Math.ceil(this.anemy_y)][Math.floor(this.anemy_x)] == -1) {
				this.b+=1;
			}
			//좌
			if(this.navigation_background[Math.ceil(this.anemy_y)][Math.floor(this.anemy_x)] == -1) {
				this.a-=1;
			}
			//우
			if(this.navigation_background[Math.ceil(this.anemy_y)][Math.ceil(this.anemy_x)] == -1) {
				this.a+=1;
			}
			if((((this.b/10)%2 == 1 && this.b%10 == 0) && ((this.a/10)%2 == 1 && this.a%10 ==0 ))) {
				this.Anemy_BFS_Cycle= true;
				this.bool_BFS = true;

				//적의 위치값 배열 초기화
				this.arx.length = 0;
				this.ary.length = 0;
				this.arz.length = 0;
				// 큐 초기화
				this.arx = [(this.a/10-1)/2+1];
				this.ary = [(this.b/10-1)/2+1];

				// 최단경로 찾기위한 count
				this.arz = [3];
				
				
			}
		}
		
		console.log(this.a,this.b);
		cancelAnimationFrame(Animation_move);
		Animation_move = requestAnimationFrame(this.move_anemy);
		stage_draw();
		
	}
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
	let Anemy1 = new Anemy(150,130,"red"); 
	let Anemy2 = new Anemy(10,10,"white");
	let setTimeout_ctrl = 0;

	
	
    window.onload = function() {

        canvas = document.getElementById("canvas");
		context = canvas.getContext("2d");
		context2 = canvas.getContext("2d");
		stage_draw();
		
		
		//setTimeout(() => {
		
		//}, 0);
		//setTimeout(() => {
		Anemy1.Anemy_BFS();
		Anemy2.Anemy_BFS();
			
		
		
		//}, 0);
		

		document.getElementById("right").onclick =function() {
			// 게임오버
			if(game_over == true) {
				return;
			}
			player_right = true;
			player_down = false;
			player_left = false;
			player_up = false;
			spot_x = x;
			spot_y = y;
			//console.log(spot_x,spot_y);
			function turn_right() {

				spot_x = x;
				spot_y = y;
				crash_stop(x,y);
				cancelAnimationFrame(turn_contral);
				if(control_key == 0 && R_control_key == 0) {
					if((((y/10)%2 == 1 && y%10 == 0) && ((x/10)%2 == 1 && x%10 ==0 ))) {
						
						Cancel_move();
						
						if(R_Dubble_click_ctrl == 0){
							
							right_move();
							
						}
					}
					
				}
				if((((spot_y/10)%2 == 1 && spot_y%10 == 0) && ((spot_x/10)%2 == 1 && spot_x%10 ==0 ))) {
					x_spot_navi = (spot_x/10-1)/2+1;
					y_spot_navi = (spot_y/10-1)/2+1;
				
					if (x >= canvas.width -10 || navigation[y_spot_navi][x_spot_navi+1] == 2) {
						player_right = false;
						return;
					}
				}
				spot_x++;
				
				turn_contral = requestAnimationFrame(turn_right);
				//console.log(spot_x,spot_y,x,y);
			}
			turn_right();
			
		}
		
		document.getElementById("down").onclick = function() {
			// 게임오버
			if(game_over == true) {
				return;
			}
			player_up = false;
			player_down = true;
			player_left = false;
			player_right = false;
			spot_x = x;
			spot_y = y;
			//console.log(spot_x,spot_y);
			function turn_down() {

					
					crash_stop(x,y);
					spot_x = x;
					spot_y = y;
					cancelAnimationFrame(turn_contral);
					//spot_turn();
					//console.log(U_control_key,D_control_key,R_control_key,L_control_key, control_key);
					//충돌검사 후 D_control_key가 0이 되는 값만 이동 가능함
					if(control_key == 0 && D_control_key == 0) {
						if((((y/10)%2 == 1 && y%10 == 0) && ((x/10)%2 == 1 && x%10 ==0 ))) {
							Cancel_move();
							if(D_Dubble_click_ctrl ==0) {
								down_move();
							}
						}
					}
					if((((spot_y/10)%2 == 1 && spot_y%10 == 0) && ((spot_x/10)%2 == 1 && spot_x%10 ==0 ))) {
						x_spot_navi = (spot_x/10-1)/2+1;
						y_spot_navi = (spot_y/10-1)/2+1;
						//console.log(x_spot_navi, y_spot_navi)
						if(spot_y >= canvas.height -10 || navigation[y_spot_navi+1][x_spot_navi] == 2) {
							player_down = false;
							return;
						}
						
				}
				spot_y++;
				
				turn_contral = requestAnimationFrame(turn_down);
			}
			turn_down();
			
			
		}

		document.getElementById("up").onclick = function() {
			// 게임오버
			if(game_over == true) {
				return;
			}
			player_up = true;
			player_down = false;
			player_left = false;
			player_right = false;
            
			spot_x = x;
			spot_y = y;
			//console.log(spot_x,spot_y);
			function turn_UP() {
				
				
				
					spot_x = x;
					spot_y = y;
					crash_stop(x,y);
					//spot_turn();
					cancelAnimationFrame(turn_contral);
					//console.log(U_control_key,D_control_key,R_control_key,L_control_key, control_key);
					if(control_key == 0 && U_control_key == 0) {
						if((((y/10)%2 == 1 && y%10 == 0) && ((x/10)%2 == 1 && x%10 ==0 ))) {
							Cancel_move();
							if(U_Dubble_click_ctrl == 0) {
								up_move();
							}
						}
					}
					if((((spot_y/10)%2 == 1 && spot_y%10 == 0) && ((spot_x/10)%2 == 1 && spot_x%10 ==0 ))) {
					
						x_spot_navi = (spot_x/10-1)/2+1;
						y_spot_navi = (spot_y/10-1)/2+1;
						//console.log(x_spot_navi, y_spot_navi)
						if(y <= 10 || navigation[y_spot_navi-1][x_spot_navi] == 2) {
							player_up = false;
							//console.log(x, y);
							return;
						}
				
				}
				spot_y--;
				turn_contral = requestAnimationFrame(turn_UP);
				
			}
			turn_UP();
				
			
		}
		document.getElementById("left").onclick = function() {
			// 게임오버
			if(game_over == true) {
				return;
			}
			player_up = false;
			player_down = false;
			player_left = true;
			player_right = false;
			spot_x = x;
			spot_y = y;
			//console.log(spot_x,spot_y);
			function turn_left() {
				
				
					spot_x = x;
					spot_y = y;
					crash_stop(x,y);
					//spot_turn();
					cancelAnimationFrame(turn_contral);
					if(control_key == 0 && L_control_key == 0) {
						if((((y/10)%2 == 1 && y%10 == 0) && ((x/10)%2 == 1 && x%10 ==0 ))) {
							Cancel_move();
							
							if(L_Dubble_click_ctrl == 0) {
								left_move();
							}
						}
					}
					
					if((((spot_y/10)%2 == 1 && spot_y%10 == 0) && ((spot_x/10)%2 == 1 && spot_x%10 ==0 ))) {
						x_spot_navi = (spot_x/10-1)/2+1;
						y_spot_navi = (spot_y/10-1)/2+1;
						
						if(x <= 10 || navigation[y_spot_navi][x_spot_navi-1] == 2) {
							player_left = false;
							return;
						}
					
				}
				spot_x--;
				turn_contral = requestAnimationFrame(turn_left);
				//console.log(spot_x,spot_y,x,y);
			}
			
			turn_left();
			
		}
    }
	// window onload
	function stage_draw() {
		
		// x,y값은 각 함수에 들어가면 값이 변한다.
		// a,b 값은 적 위치
		context.clearRect(0, 0, canvas.width, canvas.height);
		
		for(let i =1; i<16; i++) {
			for(let j = 1 ; j<16; j++) {
				if(navigation[i][j] == 2) {
					context.fillStyle = "#050356";
					context.fillRect(cell_size*(j-1),cell_size*(i-1),cell_size,cell_size);
				} else if(navigation[i][j] == 1) {
					if(i == 6 && (j ==14|| j ==2)) {
						context.fillStyle = "grey"
						context.fillRect(cell_size*(j-1),cell_size*(i-1),cell_size,cell_size);
					} else {
						context.fillStyle = "black";
						context.fillRect(cell_size*(j-1),cell_size*(i-1),cell_size,cell_size);
					}
					
				
				//} else if(this.navigation_background[i][j] == -1) {
				//  	context.fillStyle = "grey"
				//   	context.fillRect(cell_size*(j-1),cell_size*(i-1),cell_size,cell_size);
				// }
				//else if(navigation[i][j] == 3) {
				 	//context.fillStyle = "white"
				 	//context.fillRect(cell_size*(j-1),cell_size*(i-1),cell_size,cell_size);
				} else if(navigation[i][j] == 0) {
				 	if(i == 6 && (j ==14|| j ==2)) {
					context.fillStyle = "grey"
				   	context.fillRect(cell_size*(j-1),cell_size*(i-1),cell_size,cell_size);
					 } else {
						context.fillStyle = "black";
						context.fillRect(cell_size*(j-1),cell_size*(i-1),cell_size,cell_size);
					 }
					context.beginPath();
					context.fillStyle = "yellow";
					//context.fillRect(cell_size*(j-1),cell_size*(i-1),cell_size,cell_size);
					context.arc(10*(2*(j-1)+1), 10*(2*(i-1)+1) , 2, 0, Math.PI * 2, true);
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
		Anemy2.draw();
	}
	
	function right_move() {
		
		//stage_draw();
		
		R_Dubble_click_ctrl =1;
		control_key =1;
		// 테두리에 닿으면 멈춤
		if (x >= canvas.width -10) {
			control_key =0;
			//console.log(x,y);
			return;
		} else if( x< canvas.width-10) {
			x += 1;
			call_rocation(x, y);
			stage_draw();
			if(move_cancel()) {
				telefort();
				return;
			}
			
		}
		
		Animation_right = requestAnimationFrame(right_move);
			
		
	}
	
	function down_move() {
		
		//stage_draw();
		
		D_Dubble_click_ctrl =1;
		control_key =1;
		
		if(y >= canvas.height -10) {
			control_key =0;
			//console.log(x,y);
			return;
		} else if(y <canvas.height- 10) {
			
			y += 1;
			
			call_rocation(x, y);
			stage_draw();
			//console.log(x,y);
			//이쪽으로 들어오면 control key 가 0으로 바뀜
			if(move_cancel()) {
				telefort();
				return;
			}
		}
		
		Animation_down = requestAnimationFrame(down_move);
		
	
	}
	function left_move() {
		

		//stage_draw();
		
		L_Dubble_click_ctrl =1;
		control_key =1;
		
		if(x <= 10) {
			control_key =0;
			//console.log(x,y);
			return;
		} else if(x>10) {
			
			x -= 1;
			
			call_rocation(x, y);
			stage_draw();
			if(move_cancel()) {
				telefort();
				return;
			}
			
		}
		
		Animation_left = requestAnimationFrame(left_move);
	}
	function up_move() {
		
		//stage_draw();
		U_Dubble_click_ctrl =1;
		control_key =1;
		
		if(y <= 10) {
			control_key =0;
			//console.log(x,y);
			return;
		} else if(y >10) {
			y -= 1;
			
			call_rocation(x, y);
			stage_draw();
			if(move_cancel()) {
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
			
		if((x == 10 || y == 10 ) && (((y/10)%2 == 1 && y%10 == 0) && ((x/10)%2 == 1 && x%10 ==0 ))) {
			control_key = 0;
			return true;
		}
		if((((y/10)%2 == 1 && y%10 == 0) && ((x/10)%2 == 1 && x%10 ==0 ))) {
			control_key = 0;
				return true;
		}
	}
	function telefort() {
		if(x == 270 && y ==110) {
			Anemy1.Anemy_BFS_Cycle == true
			x = 30;
			y = 110;
			stage_draw();
			Anemy1.Anemy_BFS();
			//Anemy2.Anemy_BFS();
		}else 
		if(x ==30 && y ==110) {
			Anemy1.Anemy_BFS_Cycle == true
			x = 270;
			y = 110;
			stage_draw();
			Anemy1.Anemy_BFS();
			//Anemy2.Anemy_BFS();
		}
	}

	
	// 현재위치를 navigation 배열로 전달해 값을 변경, 새로운 변수에 할당
	function call_rocation(X_rocation, Y_rocation) {
		if((((y/10)%2 == 1 && y%10 == 0) && ((x/10)%2 == 1 && x%10 ==0 ))) {
			j = (X_rocation/10-1)/2+1;
			i = (Y_rocation/10-1)/2+1;
			
			if(navigation[i][j] == 0 || navigation[i][j] == 3) {
				navigation[i][j] = 1;
				eat_count++;
				console.log(eat_count);
				if(eat_count == 134) {
					cancelAnimationFrame(Animation_move);

					if(player_down == true) {
						cancelAnimationFrame(Animation_down);
					}
					if(player_up == true) {
						cancelAnimationFrame(Animation_up);
					}
					if(player_left == true) {
						cancelAnimationFrame(Animation_left);
					}
					if(player_right == true) {
						cancelAnimationFrame(Animation_right);
					}
					alert("끝!");
				}
			}
		}
	}
	// -> 이동하는 중에 down을 클릭하면  ->를 캔슬하고 down 하는 방법.
	// 각 버튼을 누를 때 cancel_move를 서로 공유하고 다시 자기 함수를 끝내는 방법.
	function Cancel_move() {
		call_rocation(x, y);
		if(R_Dubble_click_ctrl == 1) {
			R_Dubble_click_ctrl = 0;
			cancelAnimationFrame(Animation_right);
		}
		if(L_Dubble_click_ctrl == 1) {
			L_Dubble_click_ctrl = 0;
			cancelAnimationFrame(Animation_left);
		}
		if(D_Dubble_click_ctrl == 1) {
			
			D_Dubble_click_ctrl = 0;
			cancelAnimationFrame(Animation_down);
			
		}
		if(U_Dubble_click_ctrl == 1) {
			U_Dubble_click_ctrl = 0;
			cancelAnimationFrame(Animation_up);
		}
	}
	

	function crash_stop(x_point,y_point) {
		// 10 = 1, 30 = 2 , ... 배열값을 정확히 찾기 위해서 조건을 붙여준다
		if((((y/10)%2 == 1 && y%10 == 0) && ((x/10)%2 == 1 && x%10 ==0 ))) {
			j_ = (((x_point/10)-1)/2)+1;
			i_ = (((y_point/10)-1)/2)+1;
			//console.log(i_,j_);
		}
		if(navigation[i_-1][j_] == 2) {
			U_control_key = 1;
		} else if(navigation[i_-1][j_] ==1 || navigation[i_-1][j_] == 0 || navigation[i_-1][j_] == 3) {
			U_control_key = 0;
		}
		if(navigation[i_][j_-1] == 2) {
			L_control_key = 1;
		} else if(navigation[i_][j_-1] ==1 ||navigation[i_][j_-1] == 0 || navigation[i_][j_-1] == 3) {
			L_control_key = 0;
		}
		if(navigation[i_+1][j_] == 2) {
			D_control_key = 1;
		} else if(navigation[i_+1][j_] ==1 ||navigation[i_+1][j_] == 0 || navigation[i_+1][j_] == 3) {
			D_control_key = 0;
		}
		if(navigation[i_][j_+1] == 2) {
			R_control_key = 1;
		} else if(navigation[i_][j_+1] ==1 ||navigation[i_][j_+1] == 0 || navigation[i_][j_+1] == 3) {
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

        