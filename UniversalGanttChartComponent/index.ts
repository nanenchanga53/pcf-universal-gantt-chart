import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { Xrm } from "./xrm";
import * as ReactDOM from "react-dom";
import * as React from "react";
import { Task, ViewMode } from "gantt-task-react";
import { UniversalGantt } from "./components/universal-gantt";
import { generate } from "@ant-design/colors";
import { TaskType } from "gantt-task-react/dist/types/public-types";
import { isErrorDialogOptions } from "./helper";

type DataSet = ComponentFramework.PropertyTypes.DataSet;

export class UniversalGanttChartComponent
  implements ComponentFramework.StandardControl<IInputs, IOutputs>
{
  private _container: HTMLDivElement;
  private _displayNameStr = "title";
  private _scheduledStartStr = "startTime";
  private _scheduledEndStr = "endTime";
  private _progressStr = "progress";
  private _taskTypeOption = "taskTypeOption";
  private _parentRecordStr = "parentRecord";
  private _displayColorText = "displayColorText";
  private _displayColorOption = "displayColorOption";
  private _selectedtaskNameStr = "taskName";
  private _selectedtaskNameStr2 = "taskName2";
  private _selectedtaskNameStr3 = "taskName3";
  private _dataSetName = "entityDataSet";
  private _tasksDatasetName = "tasksDataset";
  private _SubOptionIsAble = false;
  private _SubLookUpIsAble = false;
  private _SubLookUpIsAble2 = false;
  private _SubLookUpIsAble3 = false;
  private _defaultEntityColor = "#2975B2";
  private _defaultTaskType: TaskType = "task";
  private _viewMode: ViewMode;
  private _crmUserTimeOffset: number;
  private _dataSet: DataSet;
  private _tasksDataset: DataSet;
  private _locale: string;
  private _taskTypeMap: any;
  private _projects: {
    [index: string]: boolean;
  };


  private _subOptionStr = "subOption";
  private _subLookUpStr = "subLookup";
  private _subLookupRecordNameStr = "subLookupRecordName";

  constructor() {
    this.handleViewModeChange = this.handleViewModeChange.bind(this);
    this.handleExpanderStateChange = this.handleExpanderStateChange.bind(this);
    this.generateColorTheme = this.generateColorTheme.bind(this);
  }

  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary,
    container: HTMLDivElement
  ) {
    // Need to track container resize so that control could get the available width. The available height won't be provided even this is true
    context.mode.trackContainerResize(true);
    this._container = container;
    this._viewMode = <ViewMode>context.parameters.viewMode.raw;
    this._crmUserTimeOffset =
      context.userSettings.getTimeZoneOffsetMinutes(new Date()) +
      new Date().getTimezoneOffset();
    this._projects = {};
    //cr072_onlynametable
    console.log(context.parameters.entityDataSet.getTargetEntityType());
    const subParentEntityName = context.parameters.subLookupEntityName.raw;
    const subParentId = context.parameters.entityDataSet.columns.find((c) => c.alias=== "subLookup");
    
    //아래를 이용해서 연결을 만들어둔 것을 이용해 이후 연결을 이용하여 검색할 수 있다고 하는데 잘 모르겠음
    if(subParentEntityName!=null && subParentId!=null){
      context.parameters.entityDataSet.linking.addLinkedEntity({
        name: "cr072_gantttabletest",
        from : "cr072_gantttabletestid",
        to:  "cr072_onlynametable",
        linkType: "inner",
        alias: "ParentRelation"
        })    
    }

    //debugger;
    //(this._dataSet as any).addColumn("cr072_subname", "ParentRelation");
    //debugger;

    context.parameters.entityDataSet.paging.setPageSize(3000);
  }

  public updateView(context: ComponentFramework.Context<IInputs>): void {
    this.updateViewAsync(context);
  }

  /**
   * Async wrapper for update view method
   */
  private async updateViewAsync(context: ComponentFramework.Context<IInputs>) {
    this._dataSet = context.parameters.entityDataSet;
    this._tasksDataset = context.parameters.tasksDataset;
    //Columns retrieve
    const columns = this._dataSet.columns;
    const nameField = columns.find((c) => c.alias === this._displayNameStr);
    const startField = columns.find((c) => c.alias === this._scheduledStartStr);
    const endField = columns.find((c) => c.alias === this._scheduledEndStr);
    const progressField = columns.find((c) => c.alias === this._progressStr);
    if (
      !nameField ||
      !startField ||
      !endField ||
      !context.parameters.timeStep.raw
    )
      return;

    //추가 헤더
    const subOptionDisplayName = context.parameters.subOptionHeaderDisplayName.raw || ""; //리소스에서 사용 가능하게 해야함
    if(subOptionDisplayName != "")
    {
      this._SubOptionIsAble = true;
    }
    
    const subLookupDisplayName = context.parameters.subLookUpHeaderDisplayName.raw || ""; //리소스에서 사용 가능하게 해야함      
    if(subLookupDisplayName != "")
    {
      this._SubLookUpIsAble = true;
    }

    const subLookupDisplayName2 = context.parameters.subLookUpHeaderDisplayName2.raw || ""; //리소스에서 사용 가능하게 해야함      
    if(subLookupDisplayName2 != "")
    {
      this._SubLookUpIsAble2 = true;
    }

    const subLookupDisplayName3 = context.parameters.subLookUpHeaderDisplayName3.raw || ""; //리소스에서 사용 가능하게 해야함      
    if(subLookupDisplayName3 != "")
    {
      this._SubLookUpIsAble3 = true;
    }
    
    try {
      const tasks = await this.generateTasks(
        context,
        this._dataSet,
        this._tasksDataset,
        !!progressField
      );

      if (!this._locale) {
        this._locale = await this.getLocalCode(context);
      }
      const listNameCellWidth = !!context.parameters.listNameCellWidth.raw
        ? `${context.parameters.listNameCellWidth.raw}px`
        : "";

      const listCellWidth = !!context.parameters.listCellWidth.raw
        ? `${context.parameters.listCellWidth.raw}px`
        : "";
      
      
      //debugger;
      //header display names
      const recordDisplayName =
        context.parameters.customHeaderDisplayName.raw || nameField.displayName;
      const startDisplayName =
        context.parameters.customHeaderStartName.raw || startField.displayName;
      const endDisplayName =
        context.parameters.customHeaderEndName.raw || endField.displayName;
      const progressFieldName = !!progressField ? progressField.name : "";
      const progressDisplayName =
        context.parameters.customHeaderProgressName.raw ||
        (!!progressField ? progressField.displayName : "");

      

      //height setup
      const rowHeight = !!context.parameters.rowHeight.raw
        ? context.parameters.rowHeight.raw
        : 50;
      const headerHeight = !!context.parameters.headerHeight.raw
        ? context.parameters.headerHeight.raw
        : 50;

      let ganttHeight: number | undefined;
      if (context.mode.allocatedHeight !== -1) {
        ganttHeight = context.mode.allocatedHeight - 15;
      } else if (context.parameters.isSubgrid.raw === "no") {
        ganttHeight = this._container.offsetHeight - 100;
      }

      //width setup
      const columnWidthQuarter = context.parameters.columnWidthQuarter.raw || 0;
      const columnWidthHalf = context.parameters.columnWidthHalf.raw || 0;
      const columnWidthDay = context.parameters.columnWidthDay.raw || 0;
      const columnWidthWeek = context.parameters.columnWidthWeek.raw || 0;
      const columnWidthMonth = context.parameters.columnWidthMonth.raw || 0;

      const includeTime =
        context.parameters.displayDateFormat.raw === "datetime";

      const fontSize = context.parameters.fontSize.raw || "14px";
      //debugger;
      //create gantt
      const gantt = React.createElement(UniversalGantt, {
        context,
        tasks,
        ganttHeight,
        recordDisplayName,
        startDisplayName,
        endDisplayName,
        progressDisplayName,
        startFieldName: startField.name,
        endFieldName: endField.name,
        progressFieldName: progressFieldName,
        listNameCellWidth: listNameCellWidth,
        listCellWidth: listCellWidth,
        timeStep: context.parameters.timeStep.raw,
        rowHeight: rowHeight,
        headerHeight: headerHeight,
        isProgressing: !!progressField,
        viewMode: this._viewMode,
        includeTime: includeTime,
        locale: this._locale,
        rtl: context.userSettings.isRTL,
        crmUserTimeOffset: this._crmUserTimeOffset,
        fontSize,
        columnWidthQuarter,
        columnWidthHalf,
        columnWidthDay,
        columnWidthWeek,
        columnWidthMonth,
        onViewChange: this.handleViewModeChange,
        onExpanderStateChange: this.handleExpanderStateChange,
        subOptionDisplayName,
        subLookupDisplayName,
        subLookupDisplayName2,
        subLookupDisplayName3,
      });

      ReactDOM.render(gantt, this._container);
    } catch (e) {
      console.error(e);
    }
  }

  private async generateTasks(
    context: ComponentFramework.Context<IInputs>,
    dataset: ComponentFramework.PropertyTypes.DataSet,
    tasksDataset: ComponentFramework.PropertyTypes.DataSet,
    isProgressing: boolean
  ) 
  {
    let entityTypesAndColors: {
      entityLogicalName: string;
      backgroundColor: string;
      backgroundSelectedColor: string;
      progressColor: string;
      progressSelectedColor: string;
    }[] = [];
    const isDisabled = context.parameters.displayMode.raw === "readonly";

    let tasks: Task[] = [];
    for (const recordId of dataset.sortedRecordIds) {
      const record = dataset.records[recordId];
      const name = <string>record.getValue(this._displayNameStr);
      const start = <string>record.getValue(this._scheduledStartStr);
      const end = <string>record.getValue(this._scheduledEndStr);
      const taskTypeOption = <string>record.getValue(this._taskTypeOption);
      const parentRecord = <ComponentFramework.EntityReference>(
        record.getValue(this._parentRecordStr)
      );
      const progress = isProgressing
        ? Number(record.getValue(this._progressStr))
        : 0;
      const colorText = <string>record.getValue(this._displayColorText);
      const optionValue = <string>record.getValue(this._displayColorOption);
      const optionColum = dataset.columns.find(
        (c) => c.alias == this._displayColorOption
      );
      const optionLogicalName = !!optionColum ? optionColum.name : "";
      const taskType = this.getTaskType(
        taskTypeOption,
        context.parameters.taskTypeMapping.raw
      );
      const entRef = record.getNamedReference();
      const entName = entRef.etn || <string>(<any>entRef).logicalName;

      //추가본
      const subOption = <string>record.getValue(this._subOptionStr);
      const subLookupEntityName = context.parameters.subLookupEntityName.raw || "";
      const subLookupRecordName = context.parameters.subLookupRecordName.raw || "";
      const subLookup = <ComponentFramework.EntityReference>(record.getValue(this._subLookUpStr));
      
      let entityColorTheme = entityTypesAndColors.find(
        (e) => e.entityLogicalName === entName
      );

      if (!entityColorTheme || colorText || optionLogicalName) {
        entityColorTheme = await this.generateColorTheme(
          context,
          entName,
          colorText,
          optionValue,
          optionLogicalName
        );
        entityTypesAndColors.push(entityColorTheme);
      }

      if (!name || !start || !end) continue;
      try {
        const taskId = record.getRecordId();
        const task: Task = {
          id: taskId,
          name,
          start: new Date(
            new Date(start).getTime() + this._crmUserTimeOffset * 60000
          ),
          end: new Date(
            new Date(end).getTime() + this._crmUserTimeOffset * 60000
          ),
          progress: progress,
          type: taskType,
          isDisabled: isDisabled,
          styles: { ...entityColorTheme },
          
        };
        if (taskType === "project") {
          const expanderState = this._projects[taskId];
          if (!expanderState) {
            this._projects[taskId] = false;
            task.hideChildren = false;
          } else {
            task.hideChildren = this._projects[taskId];
          }
        }
        if (parentRecord) {
          const parentRecordId = parentRecord.id.guid;
          const parentRecordRef = dataset.records[parentRecordId];
          if (parentRecordRef) {
            const parentType = this.getTaskType(
              <string>parentRecordRef.getValue(this._taskTypeOption),
              context.parameters.taskTypeMapping.raw
            );
            if (parentType === "project") {
              task.project = parentRecordId;
            } else {
              task.dependencies = [parentRecordId];
            }
          }
        }

        //debugger;
        //추가
        if(subOption && this._SubOptionIsAble)
        {
          
          //debugger;
          const subOptionColum = dataset.columns.find((c) => c.alias == this._subOptionStr)
          const subOptionLogicalName = !!subOptionColum ? subOptionColum.name : "";
          
          
          const subOptionResult = await context.utils.getEntityMetadata(entName, [
            subOptionLogicalName,
          ]);
          
          const subAttributes: Xrm.EntityMetadata.AttributesCollection =   subOptionResult["Attributes"];
          
          const subOptionMetadata = subAttributes.getByName(subOptionLogicalName);

           const subOptionLable = subOptionMetadata.attributeDescriptor.OptionSet.find(
             (o) => o.Value === +subOption
           )?.Label;
          //debugger;

          task.subOptionValue = subOptionLable || "";

        }
        else if(this._SubOptionIsAble)
        {
          task.subOptionValue = "";
        }

        //debugger;

        if(subLookup && this._SubLookUpIsAble)
        {
          //debugger;
          if(tasksDataset != undefined)
          {
            //(dataset as any).addColumn("cr072_subname", "ParentRelation");
            //const subLookupColum = dataset.columns.find((c) => c.alias == this._subLookUpStr);

            //const sublookupGetLinkedEntities = dataset.linking.getLinkedEntities();

            //아래것들이 안되서 문제
            //const sublookupGetLinkedId = dataset.columns.find((c) => c.alias == "cr072_onlynametableid");
            //const testsublookup = dataset.records["edf08f6f-79dd-ed11-8846-002248cc35dc"].getValue("ParentRelation.cr072_subname");

            
            const subLookupGetColumnItem = <string>tasksDataset.records[subLookup.id.guid].getValue(this._selectedtaskNameStr);
            

            task.subLookupValue = subLookupGetColumnItem || "";
          }
          else
          {
            task.subLookupValue = "";
          }
        }
        else if(this._SubLookUpIsAble)
        {
          task.subLookupValue = "";
        }

        if(subLookup && this._SubLookUpIsAble2)
        {
          //debugger;
          if(tasksDataset != undefined)
          {
            
            const subLookupGetColumnItem2 = <string>tasksDataset.records[subLookup.id.guid].getValue(this._selectedtaskNameStr2);
            
            task.subLookupValue2 = subLookupGetColumnItem2 || "";
          }
          else
          {
            task.subLookupValue2 =  "";
          }
        }
        else if(this._SubLookUpIsAble2)
        {
          task.subLookupValue2 = "";
        }

        if(subLookup && this._SubLookUpIsAble3)
        {
          //debugger;
          if(tasksDataset != undefined)
          {
            
            const subLookupGetColumnItem3 = <string>tasksDataset.records[subLookup.id.guid].getValue(this._selectedtaskNameStr3);
            
            task.subLookupValue3 = subLookupGetColumnItem3 || "";
          }
          else
          {
            task.subLookupValue3 = "";
          }
        }
        else if(this._SubLookUpIsAble3)
        {
          task.subLookupValue3 = "";
        }

        tasks.push(task);
      } catch (e) {
        throw new Error(
          `Create task error. Record id: ${record.getRecordId()}, name: ${name}, start time: ${start}, end time: ${end}, progress: ${progress}. Error text ${e}`
        );
      }
    }
    return tasks;
  }

  private async generateColorTheme(
    context: ComponentFramework.Context<IInputs>,
    entName: string,
    colorText: string,
    optionValue: string,
    optionLogicalName: string
  ) {
    let entityColor = this._defaultEntityColor;
    //Model App
    if (context.mode.allocatedHeight === -1 && !colorText) {
      if (optionValue) {
        //Get by OptionSet Color
        const result = await context.utils.getEntityMetadata(entName, [
          optionLogicalName,
        ]);
        const attributes: Xrm.EntityMetadata.AttributesCollection =
          result["Attributes"];
        const optionMetadata = attributes.getByName(optionLogicalName);
        entityColor =
          optionMetadata.attributeDescriptor.OptionSet.find(
            (o) => o.Value === +optionValue
          )?.Color || entityColor;
          //debugger;
      } else {
        //Get by Entity Color
        const result = await context.utils.getEntityMetadata(entName, [
          "EntityColor",
        ]);
        entityColor = result["EntityColor"];
      }
    } else if (colorText) {
      //Get by Text Color
      entityColor = colorText;
    }

    const colors = generate(entityColor);
    const backgroundColor =
      context.parameters.customBackgroundColor.raw || colors[2];
    const backgroundSelectedColor =
      context.parameters.customBackgroundSelectedColor.raw || colors[3];
    const progressColor =
      context.parameters.customProgressColor.raw || colors[4];
    const progressSelectedColor =
      context.parameters.customProgressSelectedColor.raw || colors[5];

    return {
      entityLogicalName: entName,
      backgroundColor: backgroundColor,
      backgroundSelectedColor: backgroundSelectedColor,
      progressColor: progressColor,
      progressSelectedColor: progressSelectedColor,
    };
  }

  private getTaskType(
    taskTypeOption: string,
    taskTypeMapping: string | null
  ): TaskType {
    //debugger;
    let taskType: TaskType = this._defaultTaskType;
    if (taskTypeOption && taskTypeMapping) {
      if (!this._taskTypeMap) {
        this._taskTypeMap = JSON.parse(taskTypeMapping);
      }
      taskType = <TaskType>this._taskTypeMap[taskTypeOption];
    }
    return taskType;
  }

  private handleViewModeChange(viewMode: ViewMode) {
    this._viewMode = viewMode;
  }

  private handleExpanderStateChange(itemId: string, expanderState: boolean) {
    this._projects[itemId] = expanderState;
    this._dataSet.refresh();
  }

  private async getLocalCode(context: ComponentFramework.Context<IInputs>) {
    try {
      const languages = await context.webAPI.retrieveMultipleRecords(
        "languagelocale",
        `?$select=code&$filter=localeid eq ${context.userSettings.languageId}`
      );
      if (languages.entities.length > 0) {
        const code = languages.entities[0].code;
        return code;
      }
    } catch (e) {
      if (isErrorDialogOptions(e)) {
        context.navigation.openErrorDialog(e);
      } else {
        console.error(e);
      }
    }

    return "en"; // English
  }
  /**
   * It is called by the framework prior to a control receiving new data.
   * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
   */
  public getOutputs(): IOutputs {
    return {};
  }

  /**
   * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
   * i.e. cancelling any pending remote calls, removing listeners, etc.
   */
  public destroy(): void {
    ReactDOM.unmountComponentAtNode(this._container);
  }
}
