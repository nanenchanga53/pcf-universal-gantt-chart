//node_modules\gantt-task-react\dist\types 경로에서 다음 파일을 사용
/// <reference types="react" />
export declare enum ViewMode {
    QuarterDay = "Quarter Day",
    HalfDay = "Half Day",
    Day = "Day",
    /** ISO-8601 week */
    Week = "Week",
    Month = "Month"
}
export declare type TaskType = "task" | "milestone" | "project";
export interface Task {
    id: string;
    type: TaskType;
    name: string;
    start: Date;
    end: Date;
    /**
     * From 0 to 100
     */
    progress: number;
    styles?: {
        backgroundColor?: string;
        backgroundSelectedColor?: string;
        progressColor?: string;
        progressSelectedColor?: string;
    };
    isDisabled?: boolean;
    project?: string;
    dependencies?: string[];
    hideChildren?: boolean;

    //선택 레코드의 값을 표현하기 위해
    subOptionValue?:string;
    //조회 레코드의 첫번째 값을 표현하기 위해
    subLookupValue?:string;
    //조회 레코드의 두번째 값을 표현하기 위해
    subLookupValue2?:string;
    //조회 레코드의 세번째 값을 표현하기 위해
    subLookupValue3?:string;
}
export interface EventOption {
    /**
     * Time step value for date changes.
     */
    timeStep?: number;
    /**
     * Invokes on bar select on unselect.
     */
    onSelect?: (task: Task, isSelected: boolean) => void;
    /**
     * Invokes on bar double click.
     */
    onDoubleClick?: (task: Task) => void;
    /**
     * Invokes on end and start time change. Chart undoes operation if method return false or error.
     */
    onDateChange?: (task: Task, children: Task[]) => void | boolean | Promise<void> | Promise<boolean>;
    /**
     * Invokes on progress change. Chart undoes operation if method return false or error.
     */
    onProgressChange?: (task: Task, children: Task[]) => void | boolean | Promise<void> | Promise<boolean>;
    /**
     * Invokes on delete selected task. Chart undoes operation if method return false or error.
     */
    onDelete?: (task: Task) => void | boolean | Promise<void> | Promise<boolean>;
    /**
     * Invokes on expander on task list
     */
    onExpanderClick?: (task: Task) => void;
}
export interface DisplayOption {
    viewMode?: ViewMode;
    /**
     * Specifies the month name language. Able formats: ISO 639-2, Java Locale
     */
    locale?: string;
    rtl?: boolean;
}
export interface StylingOption {
    headerHeight?: number;
    columnWidth?: number;

    //이름셀 가로 크기를 위해 추가
    listNameCellWidth?: string;
    listCellWidth?: string;
    rowHeight?: number;
    ganttHeight?: number;
    barCornerRadius?: number;
    handleWidth?: number;
    fontFamily?: string;
    fontSize?: string;
    /**
     * How many of row width can be taken by task.
     * From 0 to 100
     */
    barFill?: number;
    barProgressColor?: string;
    barProgressSelectedColor?: string;
    barBackgroundColor?: string;
    barBackgroundSelectedColor?: string;
    projectProgressColor?: string;
    projectProgressSelectedColor?: string;
    projectBackgroundColor?: string;
    projectBackgroundSelectedColor?: string;
    milestoneBackgroundColor?: string;
    milestoneBackgroundSelectedColor?: string;
    arrowColor?: string;
    arrowIndent?: number;
    todayColor?: string;
    TooltipContent?: React.FC<{
        task: Task;
        fontSize: string;
        fontFamily: string;
    }>;
    TaskListHeader?: React.FC<{
        rowNameWidth: string;
        headerHeight: number;
        rowWidth: string;
        fontFamily: string;
        fontSize: string;
    }>;
    TaskListTable?: React.FC<{
        rowNameWidth: string;
        rowHeight: number;
        rowWidth: string;
        fontFamily: string;
        fontSize: string;
        locale: string;
        tasks: Task[];
        selectedTaskId: string;
        /**
         * Sets selected task by id
         */
        setSelectedTask: (taskId: string) => void;
        onExpanderClick: (task: Task) => void;
    }>;
}
export interface GanttProps extends EventOption, DisplayOption, StylingOption {
    tasks: Task[];
}
