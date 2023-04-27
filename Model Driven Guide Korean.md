# 모델기반 앱 가이드

![예시](https://raw.githubusercontent.com/nanenchanga53/pcf-universal-gantt-chart/master/DocumentationAssets/ganttStandardWithProgress.png)

## 사용하기위한 사전작업
> 빌드부터하려면 [참조](./PCF_Build_Korean.md)

1. 다음의 마지막 버전 솔루션 파일을 다운로드(현제 만들고 있는것으로 변경 예정 현재껀 원본) [here](https://github.com/MaTeMaTuK/pcf-universal-gantt-chart/releases)
2. 솔루션파일을 사용하려는 Power Platform에 업로드
3. Prepare entity color for palette. Read more [here](./README.md#색상지정)
 

## 필수 설정

![example](https://raw.githubusercontent.com/nanenchanga53/pcf-universal-gantt-chart/master/DocumentationAssets/ganttStandardInstall.png)

1. 'display title' 에 이름에 해당되는 레코드 설정
2. 'start time' 에 시작 시간에 해당되는 레코드 설정
3. 'end time' 에 종료 시간에 해당되는 레코드 설정
4. README 등을 참고하여 나머지 설정 변경

## 간트차트 Task바 색상선택 추가 설명
1. 간트 차트의 각 항목의 색상으로 사용할 선택(Option)레코드의 선택 레코드 설정에서 동기화한 선택 항목을 편집화면에 들어간다.

![optioncolorsetting](https://raw.githubusercontent.com/nanenchanga53/pcf-universal-gantt-chart/master/DocumentationAssets/OptionSetConfig.png)

2. 각 선택 항목의 레이블 옆의 색상을 선택하여 변경한다(처음에는 색 없는 아이콘이 표시될 것이다.)

![changeColor](https://raw.githubusercontent.com/nanenchanga53/pcf-universal-gantt-chart/master/DocumentationAssets/OptionSetColor.png)

3. 각 항목마다 색상을 지정하고 테이블 뷰(클래식)의 사용자 지정 컨트롤(Custom Controls) 편집창을 연다.

4. Entity-Grid 항목 중 DisplayColor(Option)을 편집하여 색상을 지정한 레코드를 선택한다.

![customcontorlOptionColorSelect](https://raw.githubusercontent.com/nanenchanga53/pcf-universal-gantt-chart/master/DocumentationAssets/OptionColorChange.png)

## 추가 컬럼 설정
### 선택(option) 레코드
> 아래 설정중 subOptionHeader의 유무로 테이블의 영역이 만들어지는 여부가 결정되니 주의한다.
![optionExample](https://raw.githubusercontent.com/nanenchanga53/pcf-universal-gantt-chart/master/DocumentationAssets/OptionEarea.png)

1. 테이블 뷰(클래식)의 사용자 지정 컨트롤(Custom Controls) 편집창을 연다.

2. Entity-Grid 항목 중 subOption을 편집하여 보여지기 원하는 선택 레코드를 선택한다.

![optionExample](https://raw.githubusercontent.com/nanenchanga53/pcf-universal-gantt-chart/master/DocumentationAssets/OptionsubOptionConfig.png)

3. subOptionHeader DisplayName 을 수정하여 테이블의 헤더값이 될 텍스트 값을 넣는다(레코드에서 선택하지 말고 직접 입력하자)

![optionExample](https://raw.githubusercontent.com/nanenchanga53/pcf-universal-gantt-chart/master/DocumentationAssets/subOptionDisplayHeaderName.png)

### 조회(Lookup) 레코드
> 아래 설정중 subOptionHeader Display Name(숫자) 에서 테이블의 영역이 만들어지는 여부가 결정되니 주의한다.

1. 테이블 뷰(클래식)의 사용자 지정 컨트롤(Custom Controls) 편집창을 연다.

2. subOption 에서 조회 레코드를 선택한다.

![optionExample](https://raw.githubusercontent.com/nanenchanga53/pcf-universal-gantt-chart/master/DocumentationAssets/subLookupRecordConfig.png)

3. DataSet_Display_Key 에서 조회 레코드와 연결된 테이블을 선택한다.

![optionExample](https://raw.githubusercontent.com/nanenchanga53/pcf-universal-gantt-chart/master/DocumentationAssets/sublookupchildrecords.png)

4. Property_Display_Key(숫자) 에서 테이블에 표시될 하위 레코드를 선택한다.(표시하고 싶은 개수만큼 각각 선택한다.)

5. subOptionHeader Display Name(숫자) 에서 테이블에 표시될 각각의 헤더명을 입력한다.(레코드를 선택하지 말고 직접 입력한다)

![optionExample](https://raw.githubusercontent.com/nanenchanga53/pcf-universal-gantt-chart/master/DocumentationAssets/sublookupheadernames.png)

준비됐다면 🙂

필드에 자동으로 내용이 입력될 것입니다.

아래는 이슈등을 상담받을 수 있다는 내용인데 현재 원작자가 활동 내역이 최근에 없는것으로 보아 대답은 기대하기 힘들다
Ask me you can [here](https://github.com/MaTeMaTuK/pcf-universal-gantt-chart/issues) or you can find my contact information [here](https://github.com/MaTeMaTuK)
