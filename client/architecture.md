사이트 움직임에 대해, 
빨간색 Header 영역은 거의 모든 사이트의 웹에서 중복적으로 등장하고, 기능적으로 /lecture /mentors /challenges /club /communities 로의 네비게이션 그리고 Search를 행합니다. 현재는 나머지 url은 고려하지않고 강의만 고려함.
이때 거의 중복적으로 등작하지만 어떤 페이지에서는 Search는 사라집니다. 

파랑색 HERO부분은 4개에 중복적으로 등장하고 캐러셀입니다. 

노란색부분은 로그인한 사용자면 이미 수강중인 강좌들의 DASHboard가 나타나며 아니라면, 0원 강의 같은 기획 Hooking 강의카드리스트가 등장합니다.

초록과 주황부분은 강의네비게이션과 강의가 카드의 그리드리스트로 등장하는 섹션인데 페이지고정이아니라 
강의네비게이션의 페이지는 페이지 이동이 일어납니다 즉 all 을 기본값으로해서 현재 / 의 라우트에서 랜더링 된 상태이며 여기서 강의네비게이션(초록)부분을 누르면 주소창에서 https://www.inflearn.com/courses/it-programming 같이 url 변경이 일어나며 페이지 URL이동이존재합니다.  https://www.inflearn.com/courses/productivity 같이 있스빈다.
다만 all 을 랜더링 하고 있을 뿐입니다. 

src/app의 provider는 일단 여기서 다루지않기로함 

1. widgets: Header(search, sitenav 포함) , Hero ,Dashboard(로그인했다면), freecourse(로그인안한유저람면)

2. features: Search,  CourseCard(courseCardNav, courseCardList , courseCard,Tabs(course filter))

3. entities: user(로그인시 개인화된 화면제공하기위해(Dashboard , 그리고 맞춤형강의를 상위에 노출)), Course목록들

4.pages: 4-1)Home이 될 페이지의 구성 순서대로 Hero , Dashboard or freecourse , couseCardNav , Tabs, courseCardLists, Footer(widgets이지만 너무간단한 footer라 따로설명안했음) 
4-2)courseCategory tabs(filter) 또는 courseCardNAv선택하여 리다이렉트되는 페이지로 순서대로 Hero , Tabs, CourseCardList 가존재한다.


5. ui요소는 shared 에 존재한다고 가정 

최종적 nextjs의 routing 전략 



/app- layout.tsx : <Header /> <- Search 기능 끌수있고 킬수있음 
{Children} <-4-1 Home

/lecture
/metors
/challenges 
/club
/communities



/course/[courseNavigationGivemeCategory]/page.tsx <- 4-2 courseCategory
- filter 로 걸르는건 어떻게 파라미터로 해야할지고민중 


여기까지 지금 FSD + NEXTJS 로 설계함 



