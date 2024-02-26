---
layout: home
head:
  - - meta
    - name: keywords
      content: 码上学习
# hero:
#   name: 码上学习
#   text: 求知若渴，虚心若愚！
---
<SpotlightCursorText>
  <div class="">求知若渴&nbsp;&nbsp;虚心若愚</div>
</SpotlightCursorText>

<div class="custom">
  <div class="piece-box">
    <div class="piece-box2">
      <div class="piece piece-1"></div>
      <div class="piece piece-2"></div>
      <div class="piece piece-3"></div>
      <div class="piece piece-4"></div>
      <div class="piece piece-5"></div>
      <div class="piece piece-6"></div>
    </div>
  </div>
</div>

<style lang="stylus">
.container
  padding: 0 !important;
  max-width: none !important;

.custom
  perspective: 600px;

.piece-box
  position: relative;
  z-index: 10;
  width: 200px;
  min-height: 200px;
  margin: 80px auto 50px;
  perspective-origin: 50% 50%;
  transform-style: preserve-3d;
  animation: pieceRotate 5s;

.piece-box2
  transform-style: preserve-3d;
  animation: boxRotate 5s 10s;

.piece
  position: absolute;
  width: 200px;
  height: 200px;
  background: red;
  opacity: 0.6;
  border: 5px solid #000;
  box-sizing: border-box;
.piece-1
  background: #FF6666;
  transform: rotateY(0deg) translateZ(173.2px);
  animation: piece1Rotate 5s 5s;
  animation-fill-mode: forwards;
.piece-2
  background: #FFFF00;
  transform: rotateY(60deg) translateZ(173.2px);
  animation: piece2Rotate 5s 5s;
  animation-fill-mode: forwards;
.piece-3
  background: #006699;
  transform: rotateY(120deg) translateZ(173.2px);
  animation: piece3Rotate 5s 5s;
  animation-fill-mode: forwards;
.piece-4
  background: #009999;
  transform: rotateY(180deg) translateZ(173.2px);
  animation: piece4Rotate 5s 5s;
  animation-fill-mode: forwards;
.piece-5
  background: #FF0033;
  transform: rotateY(240deg) translateZ(173.2px);
  animation: piece5Rotate 5s 5s;
  animation-fill-mode: forwards;
.piece-6
  background: #FF6600;
  transform: rotateY(300deg) translateZ(173.2px);
  animation: piece6Rotate 5s 5s;
  animation-fill-mode: forwards;

@keyframes pieceRotate
  from
    transform rotateY(0deg)
  to
    transform rotateY(360deg)

@keyframes piece1Rotate
  from
    transform: rotateY(0deg) translateZ(173.2px)
  to
    transform:  rotateY(0deg) translateZ(100px)

@keyframes piece2Rotate
  from 
    transform: rotateY(60deg) translateZ(173.2px)
  to 
    transform:  rotateY(0deg) translateZ(-100px)

@keyframes piece3Rotate
  from
    transform: rotateY(120deg) translateZ(173.2px)
  to
    transform: translateX(-100px) rotateY(90deg)

@keyframes piece4Rotate
  from
    transform: rotateY(180deg) translateZ(173.2px)
  to
    transform: translateX(100px) rotateY(90deg)

@keyframes piece5Rotate
  from
    transform: rotateY(240deg) translateZ(173.2px)
  to
    transform: translateY(-100px) rotateX(90deg)

@keyframes piece6Rotate
  from
    transform: rotateY(300deg) translateZ(173.2px)
  to
    transform: translateY(100px) rotateX(90deg)

@keyframes boxRotate
  from
    transform rotateX(0deg) rotateY(0deg)
  to
    transform rotateX(360deg) rotateY(360deg)
</style>