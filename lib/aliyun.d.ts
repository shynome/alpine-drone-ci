declare namespace Aliyun {
  interface RequiredArgv {
    AccessKeyId: string
    AccessKeySecret: string
  }
  interface DescribeRefreshTasksParamters {
    Action: 'DescribeRefreshTasks'
    /**
     * 示例: www.yourdomain.com   
     * 域名。
     */
    DomainName?: string
    /**
     * 示例: 2017-12-22T08:00:00:00Z    
     * 结束时间，格式例如：2017-01-01T12:12:20Z。
     */
    EndTime?: string
    /**
     * 示例: http://aaa.com/1.txt   
     * 按路径查询，准确匹配。
     */
    ObjectPath?:''
    /**
     * 示例: file   
     * 任务类型。
     * - file
     * - path
     * - preload
     * 
     * 当指定DomainName或TaskStatus时，该项为必填。
     */
    ObjectType?: 'file'|'path'|'preload'
    /**
     * 示例: 1     
     * 取得第几页。   
     * 取值范围：1~100000
     */
    PageNumber?: number
    /**
     * 示例: 20     
     * 分页大小。最大值：50   
     * 取值范围：1~50之前的任意整数。：   
     * 默认值：20
     */
    PageSize?:number
    /**
     * 示例: your resourceGroupId   
     * 资源组ID。
     */
    ResourceGroupId?:string
    /**
     * 示例: 2017-12-21T08:00:00:00Z    
     * 开始时间，格式例如：2017-01-01T12:12:20Z。
     */
    StartTime?: string
    /**
     * 示例: Complete   
     * 任务状态。   
     * - Complete（完成）
     * - Refreshing（刷新中）
     * - Failed（刷新失败）
     */
    Status?: string
    /**
     * 示例: 1234321    
     * 按任务ID查询刷新状态。
     */
    TaskId?: string
  }
  interface DescribeRefreshTasksResponse {
    TaskItem: {
      TaskId: string
      ObjectPath: string
    }
    PageSize: number
    PageNumber: number
    TotalCount: number
    RequestId: string
    Tasks: DescribeRefreshTasksResponse['TaskItem'][]
  }
}