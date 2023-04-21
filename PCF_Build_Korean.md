# 프로젝트 빌드 방법
> 처음부터 dataset 용 PCF를 제작하는 방법은 [MS_Learn](https://learn.microsoft.com/ko-kr/power-apps/developer/component-framework/tutorial-create-model-driven-app-dataset-component)과 [Git](https://github.com/MicrosoftDocs/powerapps-docs/blob/main/powerapps-docs/developer/component-framework/tutorial-create-canvas-dataset-component.md)을 참고

1. [Git](https://github.com/nanenchanga53/pcf-universal-gantt-chart)에서 Clone 혹은 zip 파일을 받아 압축을 푼다.

2. 코드를 받은 경로에서 터미널을 열어 `npm install`을 실행한다.(사용하려면 [nodejs](https://nodejs.org/en/download) 설치필요)

3. `npm install` 명령어로 생성된 `\node_modules\gantt-task-react\dist\types` 경로에 있는 `Task` 인터페이스에 `subOptionValue?:string;`와 `subLookupValue?:string;`를 추가해준다.(해당 설명은 변경될 내용에 따라 달라질 예정)


4. 터미널에서 `pac auth create --url https://{환경명.crm.dynamics.com}`을 입력하여 솔루션을 업로드하고 싶은 환경에 로그인한다.(pac 명령어를 사용하려면 [Power Platform CLI를 설치해야한다.](https://learn.microsoft.com/en-us/power-platform/developer/cli/introduction) 가장 쉬운 방법은 vscode에서 'Power Platform VS Code Extention' 패키지를 설치하는 것이다.)

5. 다음 명령어를 실행해 PCF 솔루션을 업로드한다. samples 부분을 변경하면서 올려보자 `pac pcf push --publisher-prefix samples`