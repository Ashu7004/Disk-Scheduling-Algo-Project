// const input = [82,170,43,140,24,16,190];
const startingDisk = 50;

//   FCFS
function FCFS(input, start=0) {
  let seekTime = Math.abs(startingDisk - input[0]);
  for (let i = 1; i < input.length; i++) {
    seekTime += Math.abs(input[i] - input[i - 1]);
  }
  return [start,...input];
}

// SSTF
function nextMinDisk(curr, request, Visited) {
  let minValue = 100;
  let index = -1;
  for (let i = 0; i < request.length; i++) {
    if (Visited[i] == 0 && Math.abs(curr - request[i]) < minValue) {
      minValue = Math.abs(curr - request[i]);
      index = i;
    }
  }
  return index;
}
function SSTF(input, start=0) {
  const request = input;
  const Visited = Array(request.length).fill(0);
  const DiskVisitingOrder = [start];
  for (let i = 0; i < request.length; i++) {
    const nextDisk = nextMinDisk(DiskVisitingOrder[i], request, Visited);
    Visited[nextDisk] = 1;
    DiskVisitingOrder.push(request[nextDisk]);
    console.log(request[nextDisk]);
  }
  let seekTime = 0;
  for (let i = 1; i < DiskVisitingOrder.length; i++) {
    seekTime += Math.abs(DiskVisitingOrder[i] - DiskVisitingOrder[i - 1]);
  }
  console.log("Seek time for SSTF = " + seekTime);
  return DiskVisitingOrder;
}


// scan

function scan(input,start){
  const request=input;
  const left=[];
  const right=[];

  for(let i=0;i<request.length;i++){
    if(request[i]<start){
      left.push(request[i]);
    }
    else{
      right.push(request[i]);
    }
  }

  left.sort(function(a, b){return a - b});
  right.sort(function(a, b){return a - b});

  right.push(100);
  for(let i=left.length-1;i>=0;i--){
    right.push(left[i]);
  }
  return [start,...right];
}


// c-scan

function cScan(input,start){
  const request=input;
  const left=[];
  const right=[];

  for(let i=0;i<request.length;i++){
    if(request[i]<start){
      left.push(request[i]);
    }
    else{
      right.push(request[i]);
    }
  }

  left.sort(function(a, b){return a - b});
  right.sort(function(a, b){return a - b});

  
  return [start,...right,100,...left];
}

// Look

function look(input,start){
  const request=input;
  const left=[];
  const right=[];

  for(let i=0;i<request.length;i++){
    if(request[i]<start){
      left.push(request[i]);
    }
    else{
      right.push(request[i]);
    }
  }

  left.sort(function(a, b){return a - b});
  right.sort(function(a, b){return a - b});

  for(let i=left.length-1;i>=0;i--){
    right.push(left[i]);
  }
  return [start,...right];
}

// c-look

function cLook(input,start){
  const request=input;
  const left=[];
  const right=[];

  for(let i=0;i<request.length;i++){
    if(request[i]<start){
      left.push(request[i]);
    }
    else{
      right.push(request[i]);
    }
  }

  left.sort(function(a, b){return a - b});
  right.sort(function(a, b){return a - b});

  
  return [start,...right,...left];
}
//

const steps={FCFS:"FCFS is the simplest Disk Scheduling algorithm. It services the IO requests in the order in which they arrive. There is no starvation in this algorithm, every request is serviced.",SSTF:"Shortest seek time first (SSTF) algorithm selects the disk I/O request which requires the least disk arm movement from its current position regardless of the direction. It reduces the total seek time as compared to FCFS.",SCAN:"It is also called as Elevator Algorithm. In this algorithm, the disk arm moves into a particular direction till the end, satisfying all the requests coming in its path,and then it turns backand moves in the reverse direction satisfying requests coming in its path.It works in the way an elevator works, elevator moves in a direction completely till the last floor of that direction and then turns back.",CSCAN:"In C-SCAN algorithm, the arm of the disk moves in a particular direction servicing requests until it reaches the last cylinder, then it jumps to the last cylinder of the opposite direction without servicing any request then it turns back and start moving in that direction servicing the remaining requests.",LOOK:"It is like SCAN scheduling Algorithm to some extant except the difference that, in this scheduling algorithm, the arm of the disk stops moving inwards (or outwards) when no more request in that direction exists. This algorithm tries to overcome the overhead of SCAN algorithm which forces disk arm to move in one direction till the end regardless of knowing if any request exists in the direction or not.",CLOOK:"C Look Algorithm is similar to C-SCAN algorithm to some extent. In this algorithm, the arm of the disk moves outwards servicing requests until it reaches the highest request cylinder, then it jumps to the lowest request cylinder without servicing any request then it again start moving outwards servicing the remaining requests.It is different from C SCAN algorithm in the sense that, C SCAN force the disk arm to move till the last cylinder regardless of knowing whether any request is to be serviced on that cylinder or not."}
// start function

document.querySelector(".btn").addEventListener("click", () => {
  const displayArea = document.querySelector(".disks");
  displayArea.querySelector("canvas").remove();
  const canvas = document.createElement("canvas");
  canvas.width = 820;
  canvas.height = 500;
  canvas.id = "myCanvas";
  displayArea.appendChild(canvas);
  numberLine();
  const request = document.getElementById("requestCyc");
  const initalEle = document.getElementById("initalCyc");
  const requestArr = request.value.split(" ").map(Number);
  const queue = document.querySelector(".queue>div");
  while (queue.childElementCount != 0) {
    queue.removeChild(queue.firstChild);
  }
  for (let i = 0; i < requestArr.length; i++) {
    if (!isNaN(requestArr[i]) && requestArr[i] > 0 && requestArr[i] <= 100) {
      const disk = document.createElement("span");
      disk.classList.add("diskval");
      disk.id = requestArr[i];
      disk.innerHTML = requestArr[i];
      queue.appendChild(disk);
    }
  }
  const outputContainer=document.querySelector(".output-container");
  while (outputContainer.childElementCount != 0) {
    outputContainer.removeChild(outputContainer.firstChild);
  }
  const initalVal = parseInt(initalEle.value);
  let resultArr;
  const algo=document.getElementById("algo");

  switch(algo.value) {
    case "FCFS":
      resultArr=FCFS(requestArr,initalVal);
      document.querySelector(".heading").innerHTML="FCFS";
      document.querySelector(".def").innerHTML=steps.FCFS;
      break;
    case "SSTF":
      resultArr=SSTF(requestArr,initalVal);
      document.querySelector(".heading").innerHTML="SSTF";
      document.querySelector(".def").innerHTML=steps.SSTF;
      break;
    case "SCAN":
      resultArr=scan(requestArr,initalVal);
      document.querySelector(".heading").innerHTML="SCAN";
      document.querySelector(".def").innerHTML=steps.SCAN;
      break;
    case "CSCAN":
      resultArr=cScan(requestArr,initalVal);
      document.querySelector(".heading").innerHTML="C-SCAN";
      document.querySelector(".def").innerHTML=steps.CSCAN;
      break;
    case "LOOK":
      resultArr=look(requestArr,initalVal);
      document.querySelector(".heading").innerHTML="LOOK";
      document.querySelector(".def").innerHTML=steps.LOOK;
      break;
    case "CLOOK":
      resultArr=cLook(requestArr,initalVal);
      document.querySelector(".heading").innerHTML="C-LOOK";
      document.querySelector(".def").innerHTML=steps.CLOOK;
      break;
  }
  const seekTime=document.querySelector(".seekTimestep");
  const seekTimeAnswer=document.querySelector(".answer");
  seekTime.innerHTML="";
  seekTimeAnswer.innerHTML="";
  let seekTimevalue=0;
  let i = 0;
  const outputBox=document.createElement("div");
  outputBox.classList.add("output");
  outputBox.innerHTML=resultArr[i];
  outputContainer.appendChild(outputBox);
  makeCircle(resultArr[i], 40);
  i++;
  const interval = setInterval(() => {
    makeCircle(resultArr[i], i * 30 + 40);
    const outputBox=document.createElement("div");
    if(seekTime.innerHTML==""){
      seekTime.innerHTML=`Seek Time = |${resultArr[i]}-${resultArr[i-1]}|`;  
    }
    else{
      seekTime.innerHTML=`${seekTime.innerHTML} + |${resultArr[i]}-${resultArr[i-1]}|`;
    }
    seekTimevalue+=Math.abs(resultArr[i]-resultArr[i-1]);
    seekTimeAnswer.innerHTML=`= ${seekTimevalue}`;
    outputBox.classList.add("output");
    outputBox.innerHTML=resultArr[i];
    outputContainer.appendChild(outputBox);
    makeLine(resultArr[i - 1], (i - 1) * 30 + 40, resultArr[i], i * 30 + 40);
    i++;
    if (i == resultArr.length) {
      clearInterval(interval);
    }
  }, 2000);
});

function makeLine(x1, y1, x2, y2) {
  let c = document.getElementById("myCanvas");
  let ctx = c.getContext("2d");
  ctx.fillStyle = "#FF0000";
  ctx.moveTo(10 + x1 * 8, y1);
  ctx.lineTo(10 + x2 * 8, y2);
  ctx.stroke();
}
function makeCircle(x, y) {
  let c = document.getElementById("myCanvas");
  let ctx = c.getContext("2d");
  ctx.moveTo(14 + x * 8, y);
  ctx.arc(10 + x * 8, y, 4, 0, 2 * Math.PI);
  ctx.fillStyle = "black";
  ctx.fill();
}
function numberLine() {
  let c = document.getElementById("myCanvas");
  let ctx = c.getContext("2d");
  ctx.fillStyle = "#FF0000";
  ctx.moveTo(10, 20);
  ctx.lineTo(810, 20);
  let positionX = 10;
  for (let i = 0; i <= 10; i++) {
    ctx.moveTo(positionX, 10);
    ctx.lineTo(positionX, 30);
    if (i == 10) break;
    ctx.fillText(i * 10, positionX - 5, 9);
    for (let j = 0; j < 9; j++) {
      positionX += 8;
      if (j == 4) {
        ctx.moveTo(positionX, 12);
        ctx.lineTo(positionX, 28);
      } else {
        ctx.moveTo(positionX, 15);
        ctx.lineTo(positionX, 25);
      }
    }
    positionX += 8;
  }
  ctx.fillText(100, positionX - 10, 9);
  ctx.stroke();
}
numberLine();
