import React from 'react';
import {Input,Button,Table,Select,Icon,Modal,Form,Checkbox} from 'antd';
import {connect} from 'dva';
import router from 'umi/router';
import styles from './businessManage.less';
const {Option}=Select;
class BusinessManage extends React.Component {
  constructor(props) {
    super(props);
    this.state=({
      form:{
        page:0,
        pageSize:6,
        siteId:2
      }
  })
}
componentWillMount(){
  this.props.dispatch({type:'business/fetchLoadBusiness',payload:this.state.form});
}
//页面改变的时候
changePage=(page, pageSize)=>{
  this.props.dispatch({type:'business/fetchLoadBusiness',payload:{page:page-1,pageSize:6}})
  this.setState({
    form:{
      ...this.state.form,
      page:page-1
    }
  })
}
//搜索
toSearch=()=>{
  this.props.dispatch({type:'business/fetchLoadBusiness',payload:this.state.form});
}
inputSearch=(attr,event)=>{
  this.setState({
    form:{
      ...this.state.form,
      [attr]:event.target.value
    }
  })
}
selectSearch=(attr,value)=>{
  this.setState({
    form:{
      ...this.state.form,
      [attr]:value
    }
  })
}
toBusinessDetails=(record)=>{
  // console.log('details');
  console.log(record.id);
  router.push('/businessManage/businessDetails');
  this.props.dispatch({type:'business/fetchGetBusinessId',payload:record.id})
}
  render(){
    const columns=[{
      title:'商家ID',
      align:'center',
      render:(text,record)=>{
        return(
          <a key={record.id} onClick={this.toBusinessDetails.bind(this,record)}>{record.id}</a>
        )
      }
    },{
      title:'手机号',
      align:'center',
      dataIndex:'telephone',
    },{
      title:'QQ',
      align:'center',
      dataIndex:'qq',
    },{
      title:'本金余额',
      align:'center',
      dataIndex:'accountBj',
    },{
      title:'佣金余额',
      align:'center',
      dataIndex:'accountYj',
    },{
      title:'累积充值',
      align:'center',
      dataIndex:'allRechargeCount',
    },{
      title:'邀请ID',
      align:'center',
      dataIndex:'businesSifuId',
    },{
      title:'注册时间',
      align:'center',
      dataIndex:'registerTime',
    },{
      title:'用户等级',
      align:'center',
      dataIndex:'rank',
    },{
      title:'状态',
      align:'center',
      render:(text,record)=>{
        // console.log(typeof record.status);//string类型！
        if(record.site.status==='禁用'){
          return(
            <div style={{color:'red'}}>停用</div>
          );
        }else if(record.site.status==='启用'){
          return(
            <div style={{color:'green'}}>启用</div>
          );
        }
      }
    },{
      title:'备注',
      align:'center',
      dataIndex:'forbiddenReason',
    },{
      title:'操作',
      align:'center',
    }
  ]
    return (
      <div className={styles.content}>
        <div className={styles.content_title}>商家管理</div>
        <div className={styles.content_search}>
          <Button type="primary" style={{marginRight:285}}>
                导出
          </Button>
          <Input type="text" placeholder="商家ID" onChange={this.inputSearch.bind(this,'id')}/>
          <Input type="text" placeholder="手机号" onChange={this.inputSearch.bind(this,'telephone')}/>
          <Input type="text" placeholder="推广员ID" onChange={this.inputSearch.bind(this,'agentId')}/>
          <Select placeholder="用户等级" style={{width: 120}} onChange={this.selectSearch.bind(this,'rank')}>
              <Option value="新手上路">新手上路</Option>
              <Option value="普通用户">普通用户</Option>
              <Option value="高级用户">高级用户</Option>
          </Select>
          <Select placeholder="状态" style={{width: 120}} onChange={this.selectSearch.bind(this,'status')}>
              <Option value="true">正常</Option>
              <Option value="false">停用</Option>
          </Select>
          <Select placeholder="排序规则" style={{width: 120}} onChange={this.selectSearch.bind(this,'orderType')}>
              <Option value="时间升序">时间升序</Option>
              <Option value="时间降序">时间降序</Option>
              <Option value="本金余额升序">本金余额升序</Option>
              <Option value="本金余额降序">本金余额降序</Option>
              <Option value="累积充值升序">累积充值升序</Option>
              <Option value="累积充值降序">累积充值降序</Option>
          </Select>
          <Button type="primary" icon="search" onClick={this.toSearch}>
              Search
          </Button>
        </div>
        <Table size="small" className={styles.News_table} rowKey="id"
          pagination={
            {
              total:this.props.business.total,
              pageSize:6,
              onChange:this.changePage
            }
          } 
          bordered
          dataSource={this.props.business.businessData}
          columns={columns}
        />
      </div>
    )
  }
}

export default connect(state=>state)(BusinessManage);