import React from 'react';
import styles from './logs.less';
import {Input,Button,Table} from 'antd';
import {connect} from 'dva';
import dateParse from '@/filter/index';
class Logs extends React.Component {
  constructor(props) {
    super(props);
    this.state=({
      form:{
        page:0,
        pageSize:6
      }
    })
  }
  
  search=(event)=>{
    this.props.dispatch({type:'logs/fetchLoadLogs',payload:this.state.form})
  }
  changePage=(page,pageSize)=>{
    this.props.dispatch({type:'logs/fetchLoadLogs',payload:{page:page-1,pageSize:6}})
		this.setState({
			form:{
				...this.state.form,
        page:page,
        pageSize:pageSize
			}
		})
  }
  componentWillMount(){
    this.props.dispatch({type:'logs/fetchLoadLogs',payload:this.state.form})
  }
  inputStaffId=(event)=>{
    this.setState({
      form:{
        ...this.state.form,
        userId:event.target.value
      }
    })
  }
  render(){
    const columns = [
      {
        title:'日志ID',
        align:'center',
        dataIndex:'id',
        render: text => <a>{text}</a>
      },{
        title:'操作者ID',
        align:'center',
        dataIndex:'userId'
      },{
        title:'内容',
        align:'center',
        dataIndex:'actionContent'
      },
      {
        title:'操作时间',
        align:'center',
        dataIndex:'actionTime',
        render:(text,record)=>{
          return(
            <div>{dateParse(text)}</div>
          );
        }
      }
    ];
    return (
      <div className={styles.content}>
        <div className={styles.content_title}>日志管理</div>
        <div className={styles.content_search}>
            <Input type="text" placeholder="操作者ID" onChange={this.inputStaffId}/>
            <Button type="primary" icon="search" onClick={this.search}>
              Search
            </Button>
        </div>
        <Table size="small" className={styles.logs_table} rowKey="id" 
          pagination={
            {
              total:this.props.logs.total,
              pageSize:6,
              onChange:this.changePage
            }
          } 
          bordered
          dataSource={this.props.logs.logsData}
          columns={columns}
        />
      </div>
    )
  }
}

export default connect(state=>state)(Logs);