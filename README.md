# I Review You
비공개 리뷰 작성 서비스입니다.

네이버나 배민, 쿠팡, 잡플래닛 같이 훌륭한 기능과 데이터베이스를 가지고 있는 서비스가 있지만 리뷰가 판매에 직접적인 영향을 끼치기 때문에 사업주들은 엄청나게 신경씁니다.
부정적인 리뷰는 신고를 당해서 삭제되고, 보상을 받고 리뷰를 작성하는 경우 불리한 부분은 우회해서 표현하는 등 신뢰할 수 있는 리뷰를 찾기 너무 힘들었습니다.

그 결과 어떤 가게나 상품이 별로였는데 기억나지 않아 같은 실수를 반복하게되자 기록할 필요가 있다고 생각해서 탄생했습니다.

## 프로젝트 설정
필요

nodejs 20+

```shell
# nodejs 버전 확인
node --version
# v20.17.0 <- 현재 시점 lts 최고 버전

# corepack 사용
corepack enable

# yarn berry 사용
yarn set version stable

# 패키지 설치
yarn install

# 앱 실행
yarn dev

# yarn 버전 업그레이드 방법
# 버전은 package.json의 packageManager에 설정되어있음
corepack install --global yarn
```

## 프로젝트 구조 및 기술스택
```
(root)
├── apps
│   ├── api # 백엔드 nest.js
│   └── web # 프론트엔드 next.js
├── packages # 아직 사용 안함
├── turbo.json # 터보팩으로 모노레포 구성
└── yarn.lock # yarn berry 사용
```


