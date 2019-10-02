import React from 'react';
import style from './staff.less';
import router from 'umi/router';
import {Input,Select,Button,Table,Icon} from 'antd';
import {connect} from 'dva';
const {Option}=Select;
class Staff extends React.Component {
 constructor(props){
 		super(props)
 		this.state={
        form:{
            page:0,
            pageSize:6
        },
 		}
   }
   //页面加载的时候
   componentWillMount(){
      // console.log(this.props.dispatch);
      this.props.dispatch({type:'staff/fetchLoadStaff',payload:this.state.form});
      this.props.dispatch({type:'staff/fetchFindSite',payload:this.state});
   }
   //页面改变的时候
   changePage=(page, pageSize)=>{
		this.props.dispatch({type:'staff/fetchLoadStaff',payload:{page:page-1,pageSize:6}})
		this.setState({
			form:{
				...this.state.form,
				page:page-1
			}
		})
  }
  //改变状态的时候
  changeStatus=(record)=>{
    // console.log(record.id);
    if(record.enabled === true){
      this.props.dispatch({type:'staff/fetchChangeStatus',payload:{page:this.state.form,forms:{id:record.id,enabled:false}}});
    }else if(record.enabled === false){
      this.props.dispatch({type:'staff/fetchChangeStatus',payload:{page:this.state.form,forms:{id:record.id,enabled:true}}})
     }
  }
  //查看日志
  toLogs=()=>{
    // console.log('toLogs');
    router.push('/staff/logDetails');

  }
  // 搜索
  search=()=>{
    this.props.dispatch({type:'staff/fetchLoadStaff',payload:this.state.form})
  }
  // 搜索栏搜索员工ID
  inputStaffId=(event)=>{
   // console.log(event.target.value)
   this.setState({
     form:{
       ...this.state.form,
       id:event.target.value
     }
   })
  }
  //输入用户名搜索
  inputUserName=(event)=>{
    this.setState({
      form:{
        ...this.state.form,
        username:event.target.value 
      }
    })
  }
  //输入电话号码搜索
  inputPhone=(event)=>{
    this.setState({
      form:{
        ...this.state.form,
        telephone:event.target.value
      }
    })
  }
  // 改变下拉框
  changeSelect=(value)=>{
  //  console.log(value);
   this.setState({
     form:{
       ...this.state.form,
       enabled:value
     }
   })
 }
 //选择所属分站
 changeSite=(value)=>{
  this.setState({
    form:{
      ...this.state.form,
      siteId:value
    }
  })
 }
  render(){
    // console.log(this.state.form,'+++++++++++++++');
    // console.log(this.props,'++++++++++++++++++++');
    const columns = [
      {
        title:'员工ID',
        align:'center',
        dataIndex:'id'
      },{
        title:'所属分站',
        align:'center',
        dataIndex:'siteVM.name'
      },{
        title:'用户名',
        align:'center',
        dataIndex:'username'
      },
      {
        title:'真实姓名',
        align:'center',
        dataIndex:'realname'
      },{
        title:'手机号',
        align:'center',
        dataIndex:'telephone'
      },{
        title:'qq号',
        align:'center',
        dataIndex:'qq'
      },{
        title:'上次登录时间',
        align:'center',
        dataIndex:'lastLoginTime'
      },{
        title:'上次登录ip',
        align:'center',
        dataIndex:'lastLoginIp'
      },{
        title:'状态',
        align:'center',
        render:(text,record)=>{
          if(record.enabled===true){
            return(
              <div style={{color:'green'}}>正常</div>
            );
          }else if(record.enabled===false){
            return(
              <div style={{color:'red'}}>停用</div>
            );
          }
        }
      },{
        title:'操作',
        align:'center',
        render:(text,record)=>{
          if(record.enabled==true){
            return(
              <div>
                <Icon type="poweroff" title="禁用" style={{color:'red'}} onClick={this.changeStatus.bind(this,record)}/>&nbsp;&nbsp;
                <Icon type="profile" title="日志" style={{color:'gray'}} onClick={this.toLogs}/>
              </div>
             
            );
          }else if(record.enabled==false){
            return(
              <div>
                <Icon type="play-circle" title="启用" style={{color:'green'}} onClick={this.changeStatus.bind(this,record)}/>&nbsp;&nbsp;
                <Icon type="profile" title="日志" style={{color:'gray'}} onClick={this.toLogs}/>
              </div>
             
            );
          }
          
        }
      }
    ];
    return (
      <div className={style.content}>
        <div className={style.content_title}>员工管理</div>
        <div className={style.content_search}>
            <Input type="text" placeholder="员工ID" onChange={this.inputStaffId}/>
            <Input type="text" placeholder="用户名" onChange={this.inputUserName}/>
            <Input type="text" placeholder="手机号" onChange={this.inputPhone}/>
            <Select placeholder="状态" style={{width: 120}} onChange={this.changeSelect}>
              <Option value="1">正常</Option>
              <Option value="0">停用</Option>
            </Select>
            <Select placeholder="所属分站" style={{width: 120}} onChange={this.changeSite}>
              {
                this.props.staff.siteData.map((item)=>{
                  return (
                  <Option key={item.id} value={item.id}>{item.name}</Option>
                  )
                })
              }
            </Select>
            <Button type="primary" icon="search" onClick={this.search}>
              Search
            </Button>
        </div>
        <Table size="small" className={style.Staff_table} rowKey="id" 
          pagination={
            {
              total:this.props.staff.total,
              pageSize:6,
              onChange:this.changePage
            }
          } 
          bordered
          dataSource={this.props.staff.staffData}
          columns={columns}
        />
      </div>
    )
  }
}

export default connect(state=>state)(Staff);