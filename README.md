# sapper-template 설치 후 firebase로 배포하기

안녕하세요. 아래 내용은 svelte에 예쁜 라우팅을 가능하게 해주는 sapper의 템플릿을 로컬에 설치한 후 firebase로 배포하는 과정을 정리해놓은 것입니다. 간단히 요약한다면, sapper 템플릿을 export해서 정적 파일들을 생성한 다음 그걸 dist 폴더에 담아 firebase로 배포하는 방식입니다.

"How to host a Sapper.js SSR app on Firebase"(https://dev.to/eckhardtd/how-to-host-a-sapper-js-ssr-app-on-firebase-hmb) 포스팅에서는 firebase의 SSR(서버사이드 렌더링) 기능을 쓰기 위한 functions 배포 방식을 다루고 있는데, 저는 이 방식으로 여러 번 시도했으나 결국 다 실패해서요;; 그냥 정적 파일들 생성해서 올리는 아주 간단하고 쉬운 방식을 택했습니다;;


## 그럼 시작합니다!

> __sapper 템플릿을 로컬에 설치하자마자 firebase로 배포하는 작업 절차를 가장 간결한 버전으로 알고 싶은 경우엔 페이지 맨 아래를 보시면 됩니다!__

### sapper 템플릿을 로컬에 설치하기

아래 커맨드라인에서 1번 문장을 실행하면 sapper 템플릿이 로컬에 설치됩니다. "sapper_firebase_v3"는 제 로컬에 설치할 때 사용한 프로젝트명이니, 자신이 원하는 다른 이름으로 하셔도 됩니다. 아래 1번을 실행하면 프로젝트명으로 폴더가 생성되면서 sapper 템플릿 파일들이 생기니까, 1번을 실행하는 위치는 다른 프로젝트들이 있는 상위 폴더로 하시면 될 겁니다. 제 경우는 root 폴더에 "dev_root" 폴더를 만들어서 여기에 각종 개발 프로젝트(폴더)들을 두었는데요. sapper 템플릿 설치할 때도 dev_root 폴더에서 1번을 실행했습니다.

```bash
1. $ npx degit "sveltejs/sapper-template#rollup" sapper_firebase_v3
2. $ cd sapper_firebase_v3
```


### git 작업

sapper 템플릿 기본 파일들이 생성된 상태에서 git init을 실행해서 commit합니다. 그러면 이후 작업을 단계별로 진행할 때마다 어떤 파일이 추가되고 변경되는지 이력을 남길 수 있습니다. 로컬의 git 내역은 여기 GitHub에도 올려둡니다.

```bash
3. $ git init
4. $ git commit (sapper 템플릿 설치)
5. github에서 repository 신규 생성 (프로젝트명과 동일하게)
6. $ git remote add origin https://github.com/Mincheol-Kang/sapper_firebase_v3.git
7. $ git push -u origin master 
```


### sapper 템플릿이 의존하고 있는 모듈들 설치 후 확인

sapper 템플릿의 package.json 파일 내용을 토대로 sapper 템플릿이 의존하고 있는 모듈들을 일괄 설치합니다. 그런 다음 로컬호스트 3000 포트로 sapper 템플릿 페이지가 잘 열리는지 확인합니다. 여기까지 성공적이라면 "home / about / blog" 이렇게 세 개의 메뉴가 기본적으로 셋팅되어 있는 웹 페이지가 보일 것이고, 각 메뉴가 빠릿하게 열릴 겁니다. 주소창을 보면 라우팅이 깔끔하게 되고 있는 걸 볼 수 있습니다.

```bash
8. $ npm install
9. $ npm run dev (로컬 3000포트로 페이지 잘 열리는지 확인)
```


### 배포를 위한 정적 파일들 생성 후 확인

지금까지 진행된 내용은 사실 별 것 없습니다. git 작업을 빼면, sapper 템플릿 설치 후 의존성 모듈들까지 설치 완료 후 로컬에서 잘 열리는지 봤습니다. 이번엔 배포를 위해 정적 파일들을 생성합니다. 정적 파일은 기본적으로 "```__sapper__```" 폴더에 "build, dev, export" 이렇게 세 개의 폴더로 생성됩니다. 아래 11번 명령을 실행하면 "```__sapper__```/export" 폴더의 내용을 로컬호스트 5000포트로 볼 수 있습니다. export 폴더안엔 각 메뉴 페이지가 html로 만들어져 있습니다. blog의 post들도 모두 html로 컴파일되어 있습니다. 물론 svelte의 반응형 웹 기능은 그대로 살아있습니다.

```bash
10. $ npx sapper export (배포를 위한 정적 파일들 생성)
11. $ npx serve __sapper__/export (배포 버전 5000포트로 잘 열리는지 확인)
```


### firebase 배포를 위한 환경설정

sapper 템플릿 프로젝트 폴더에서 아래 12번 명령을 실행하면 firebase로 배포하기 위한 환경이 셋팅됩니다. firebase.google.com 사이트에서 프로젝트 생성 및 앱 연결 작업을 미리 하지 않고, 그냥 로컬의 커맨드라인에서 firebase 프로젝트 생성 및 앱 연결 작업을 진행합니다. 저는 이게 훨씬 쉽고 편하게 느껴집니다.

```bash
12. $ firebase init
```

firebase init 실행했을 때 선택하고 입력할 항목들 핵심만 뽑으면 다음과 같습니다:
```bash
    ? Which Firebase CLI features ... ? Hosting 선택
    ? Please select an option: "Create a new project" 선택
    ? Please specify a unique project id: sapper-firebase-ver3 (자신이 원하는 유니크할만한 명칭으로)
    ? What would you like to call your project? 그냥 엔터치면 'defaults to your project ID'
    ? What do you want to use as your public directory? dist
    ? Configure as a single-page app (rewrite all urls to /index.html)? No
```


### 배포 작업을 간편하게 하기 위한 스크립트 작성

./package.json 파일의 “scripts“ 부분을 다음과 같이 수정합니다. 그러면 간단한 명령으로 export 수행하여 정적 파일들을 dist 폴더에 담는 일을 한 큐에 진행할 수 있습니다. export 작업을 수행할 땐 scripts의 "prebuild" 실행 후 "build" 작업으로 dist 폴더까지 셋팅한 다음에 로컬 5000포트로 서버까지 실행하여 확인해볼 수 있게 합니다. deploy 작업을 수행할 땐 export 작업에서 dist 폴더 셋팅까지 한 다음에 로컬서버 실행 대신 firebase로 배포하는 작업을 수행합니다.

```bash
13. ./package.json 파일의 “scripts“ 부분 수정:
    "build": "sapper build --legacy && cp -R ./__sapper__/export ./dist",
    "prebuild": "rm -rf ./dist",
    "start": "npm run build && firebase serve",
    "predeploy": "npm run build",
    "deploy": "firebase deploy",
```


### export & deploy

14번 명령은 export 및 로컬서버 5000포트 실행 작업에 해당하고, 15번 명령은 export 및 배포 작업에 해당합니다. 웬만해선 모든 작업들이 깔끔하게 진행될 겁니다.

```bash
14. $ npm start (배포를 위한 dist 폴더 재생성 후 5000포트로 잘 열리는지 확인)
15. $ npm run deploy (배포를 위한 dist 폴더 재생성 후 firebase로 정식 배포)
```


## 에필로그

이상 sapper 템플릿 설치 및 배포 작업 절차를 위한 명령들을 한 번에 다 보여드리자면 다음과 같습니다.


```bash
1. $ npx degit "sveltejs/sapper-template#rollup" sapper_firebase_v3
2. $ cd sapper_firebase_v3
3. $ git init
4. $ git commit (sapper 템플릿 설치)
5. github에서 repository 신규 생성 (프로젝트명과 동일하게)
6. $ git remote add origin https://github.com/Mincheol-Kang/sapper_firebase_v3.git
7. $ git push -u origin master 
8. $ npm install
9. $ npm run dev (로컬 3000포트로 페이지 잘 열리는지 확인)
10. $ npx sapper export (배포를 위한 정적 파일들 생성)
11. $ npx serve __sapper__/export (배포 버전 5000포트로 잘 열리는지 확인)
12. $ firebase init
    ? Which Firebase CLI features ... ? Hosting 선택
    ? Please select an option: "Create a new project" 선택
    ? Please specify a unique project id: sapper-firebase-ver3 (자신이 원하는 유니크할만한 명칭으로)
    ? What would you like to call your project? 그냥 엔터치면 'defaults to your project ID'
    ? What do you want to use as your public directory? dist
    ? Configure as a single-page app (rewrite all urls to /index.html)? No
13. ./package.json 파일의 “scripts“ 부분 수정:
    "build": "sapper export --legacy && cp -R ./__sapper__/export ./dist",
    "prebuild": "rm -rf ./dist",
    "start": "npm run build && firebase serve",
    "predeploy": "npm run build",
    "deploy": "firebase deploy",
14. $ npm start (배포를 위한 dist 폴더 재생성 후 5000포트로 잘 열리는지 확인)
15. $ npm run deploy (배포를 위한 dist 폴더 재생성 후 firebase로 정식 배포)
```

git 작업이나 로컬 테스트 과정 빼고, sapper 템플릿을 설치하자마자 배포하는 절차만 정리하면 다음과 같이 훨씬 더 간결해집니다.

```bash
1. $ npx degit "sveltejs/sapper-template#rollup" sapper_firebase_v3
2. $ cd sapper_firebase_v3 && npm install
3. $ firebase init
    ? Which Firebase CLI features ... ? Hosting 선택
    ? Please select an option: "Create a new project" 선택
    ? Please specify a unique project id: sapper-firebase-ver3 (자신이 원하는 유니크할만한 명칭으로)
    ? What would you like to call your project? 그냥 엔터치면 'defaults to your project ID'
    ? What do you want to use as your public directory? dist
    ? Configure as a single-page app (rewrite all urls to /index.html)? No
4. ./package.json 파일의 “scripts“ 부분 수정:
    "build": "sapper export --legacy && cp -R ./__sapper__/export ./dist",
    "prebuild": "rm -rf ./dist",
    "start": "npm run build && firebase serve",
    "predeploy": "npm run build",
    "deploy": "firebase deploy",
5. $ npm run deploy (배포를 위한 dist 폴더 재생성 후 firebase로 정식 배포)
```

로컬에서 수정 작업 후 로컬에서 테스트해볼 땐 다음 명령이면 로컬호스트 3000 포트가 열립니다.
```bash
$ npx sapper dev
```
