# pcf-universal-gantt-chart

## 캔버스앱과 모델기반앱에서 사용가능한 간트차트 PCF

![예시](https://github.com/MaTeMaTuK/pcf-universal-gantt-chart/blob/master/DocumentationAssets/ganttStandard.gif)

## 설정
아래 설정은 원본에 있는 것들만 적혀있습니다. 수정, 추가본은 'Model Driven Guide' 쪽 문서에서 다루겠습니다.

| Parameter Name                                  | Description                                                                                                                    |
| :---------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------- |
| Title\*                                         | 막대 및 목록의 이름                                                                                          |
| Start Time\*                                    |  시작 시간                                                                                                  |
| End Time\*                                      | 종료시간                                                                                                    |
| Progress                                        | 진행율(0~100)                                                                                                    |
| Parent Record                                   | Task의 부모레코드                                                                                                    |
| Task Type(Option)                               | 레코드의 종류. Task, milestone, project. 옵션 매개변수에서 option-text 가 매핑된 레코드를 이용해 타입을 설정할 수 있다. |
| Display Color(Option)                           | 선택 레코드에서 지정된 색상을 이용해 막대의 색상 지정                                                                                    |
| Display Color(Text)                             | 헥스값(16진수)를 이용해 색상 지정                                                                                           |
| Display Mode\*                                  | 드래그앤 드롭 활성화 여부                                                                                     |
| IsSubgrid\*                                     | 간트차트의 서브그리드 사용여부                                                                                            |
| Default Duration View\*                         | 기본 기간 보기를 설정                                                                                            |
| Task Type Mapping                               | Task type을 선택값으로 설정                                                                                              |
| Display Date Format\*                           | 날짜및 시간 표시를 지정                                                                                        |
| Time Step\*                                     | 시간 이동 이벤트의 단위를 지정. 밀리세컨드 단위                                                                  |
| Font Size\*                                     | 폰트 크기 설정                                                                                                           |
| Header Height\*                                 | 헤더의 높이 설정                                                                                                       |
| Row Height\*                                    | 행의 높이 설정                                                                                                          |
| List`s Cell Width\*                             | 목록의 셀 너비. 0 을 설정하면 목록이 숨겨짐                                                                |
| Column Width for Quarter of Day\*               | 6시간 단위의 너비 길이                                                                                     |
| Column Width for Column Width for Half of Day\* | 12시간 단위의 너비 길이                                                                       |
| Column Width for Column Width for Day\*         | 일 단위의 너비 길이                                                                               |
| Column Width for Column Width for Week\*        | 주 단위의 너비                                                                              |
| Column Width for Column Width for Month\*       | 월 단위의 너비.                                                                             |
| Custom Display Name                             | 이름 명칭 변경.                                                                                                        |
| Custom Start Name                               | 시작 시간의 명칭 변경.                                                                                                     |
| Custom End Name                                 | 종료 시간의 명칭 변경                                                                                                       |
| Custom Progress Name                            | 진행률의 명칭 변경                                                                                                       |
| Custom Progress Color                           |  진행률의 작업 표시줄의 색상 변경(헥스값)                                                                                     |
| Custom Progress Selected Color                  | 선택시 작업 표시줄의 색상 변경(헥스값)                                                                          |
| Custom Background Color                         | 작업 표시줄의 배경 색상 변경(헥스값)                                                                                   |
| Custom Background Selected Color                | 선택시 작업 표시줄의 배경 색상 변경(헥스값)                                                                        |

\*  필수

# 색상지정
기본 색상 또는 사용자 지정 색상에 작업 표시줄의 색상을 설정할 수 있습니다. 기본 색상은 선택 항목, 텍스트 값 또는 엔터티 색상에서 가져올 수 있습니다. 여기에서 레코드 팔레트의 기본 색상을 만들 수 있습니다.

Gantt는 팔레트 색상에서 가져오며 #2(배경값 - background), #3(선택시 배경값 - background), #4(진행률의 색상 - progress color), #5(선택된 진행률 색상 - progress color)에서 가져옵니다

사용자 지정 색상은 색상 생성이 마음에 들지 않는 경우 재정의하도록 구성될 수 있습니다.

## 개요

원본 솔루션 [here](https://github.com/MaTeMaTuK/pcf-universal-gantt-chart/releases) in assets

원본 모델기반 앱 설정 설명 [here](/Model%20Driven%20Guide.md)

원본 캔버스 앱 설정 설명 [here](/Canvas%20Guide.md)

한국어 모델기반 앱 설정 설명 [here](/Model%20Driven%20Guide%20Korean.md)

## 추가 정보
If you need your language you may contact with me or open an issue, where you may share your translations.
변경이 필요하다면 연락을 주면 된다고 하지만 2년 전부터 활동을 찾을 수 없는것으로 보아 원본을 제작한 분에게서 조언을 얻을 수는 없을 것으로 보인다.

#### License GPLv3

#### Special thanks to [Aleksandra Daskevica](mailto:aleksandra.daskevica@cgi.com)

#### [Based on](https://github.com/MaTeMaTuK/gantt-task-react)

## 해당 수정사항을 사용하기 위해 필요한 수정작업
`npm install` 명령어로 생성될 `\node_modules\gantt-task-react\dist\types` 경로에 있는 `Task` 인터페이스에 `subOptionValue?:string;`와 `subLookupValue?:string;`를 추가해준다.(해당 설명은 변경될 내용에 따라 달라질 예정)
