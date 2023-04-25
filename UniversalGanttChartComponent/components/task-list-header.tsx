import * as React from "react";

export const createHeaderLocal = (
  recordDisplayName: string,
  startDisplayName: string,
  endDisplayName: string,
  //아래는 추가분
  subOptionDisplayName:string,  //선택 헤더 표시 값
  subLookUpDisplayName:string,  //조회 첫번째 헤더 표시 값
  subLookUpDisplayName2:string, //조회 두번째 헤더 표시 값
  subLookUpDisplayName3:string, //조회 세번째 헤더 표시 값
): React.FunctionComponent<{
  rowNameWidth: string;
  headerHeight: number;  
  rowWidth: string;
  fontFamily: string;
  fontSize: string;
}> => {
  return ({rowNameWidth, headerHeight, fontFamily, fontSize, rowWidth }) => {
    
    return (
      <div
        className="Gantt-Table"
        style={{
          fontFamily: fontFamily,
          fontSize: fontSize,
        }}
      >
        <div
          className="Gantt-Table_Header"
          style={{
            height: headerHeight - 2,
          }}
        >
          <div className="Gantt-Table_Header-Item Gantt-Header_Select__Icon" />
          <div
            className="Gantt-Table_Header-Separator"
            style={{
              height: headerHeight * 0.5,
              marginTop: headerHeight * 0.2,
            }}
          />
          <div
            className="Gantt-Table_Header-Item"
            style={{
              minWidth: rowNameWidth == undefined ? "180px" : rowNameWidth,
            }}
          >
            &nbsp;{recordDisplayName}
          </div>
          <div
            className="Gantt-Table_Header-Separator"
            style={{
              height: headerHeight * 0.5,
              marginTop: headerHeight * 0.2,
            }}
          />
          <div
            className="Gantt-Table_Header-Item"
            style={{
              minWidth: rowWidth,
            }}
          >
            &nbsp;{startDisplayName}
          </div>
          <div
            className="Gantt-Table_Header-Separator"
            style={{
              height: headerHeight * 0.5,
              marginTop: headerHeight * 0.25,
            }}
          />
          <div
            className="Gantt-Table_Header-Item"
            style={{
              minWidth: rowWidth,
            }}
          >
            &nbsp;{endDisplayName}
          </div>

          
          {
            subOptionDisplayName != "" && 
            <div
              className="Gantt-Table_Header-Separator"
              style={{
                height: headerHeight * 0.5,
                marginTop: headerHeight * 0.25
              }}
            />
          }
          {
            subOptionDisplayName != "" &&
            <div
              className="Gantt-Table_Header-Item"
              style={{
                minWidth: rowWidth,
              }}
            >
              &nbsp;{subOptionDisplayName}
            </div>
          }
          {
            subLookUpDisplayName != "" &&
            <div
              className="Gantt-Table_Header-Separator"
              style={{
                height: headerHeight * 0.5,
                marginTop: headerHeight * 0.25,
              }}
            />
          }
          {
            subLookUpDisplayName != "" &&
            <div
              className="Gantt-Table_Header-Item"
              style={{
                minWidth: rowWidth,
              }}
            >
              &nbsp;{subLookUpDisplayName}
            </div>
          }
          {
            subLookUpDisplayName2 != "" &&
            <div
              className="Gantt-Table_Header-Separator"
              style={{
                height: headerHeight * 0.5,
                marginTop: headerHeight * 0.25,
              }}
            />
          }
          {
            subLookUpDisplayName2 != "" &&
            <div
              className="Gantt-Table_Header-Item"
              style={{
                minWidth: rowWidth,
              }}
            >
              &nbsp;{subLookUpDisplayName2}
            </div>
          }
          {
            subLookUpDisplayName3 != "" &&
            <div
              className="Gantt-Table_Header-Separator"
              style={{
                height: headerHeight * 0.5,
                marginTop: headerHeight * 0.25,
              }}
            />
          }
          {
            subLookUpDisplayName3 != "" &&
            <div
              className="Gantt-Table_Header-Item"
              style={{
                minWidth: rowWidth,
              }}
            >
              &nbsp;{subLookUpDisplayName3}
            </div>
          }
        </div>
      </div>
    );
  };
};
