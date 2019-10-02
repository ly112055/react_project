import React from 'react';
import styles from './market.less';
import {Input,Button,Table,Select,Icon,Modal,Form,Checkbox} from 'antd';
import {connect} from 'dva';
import dateParse from '@/filter/index';
import router from 'umi/router';
const {Option}=Select;
const { TextArea } = Input;
class Market extends React.Component {
  constructor(props) {
    super(props);
    this.state=({
      form:{
        page:0,
        pageSize:6,
        siteId:2
      },
      visible: false,
      addForm:{
        contentSource:123,
        siteId:2,
      },
    })
  }
  componentWillMount(){
    // console.log(this.props,'-----------------------');
    this.props.dispatch({type:'market/fetchLoadMarket',payload:this.state.form});
  }
  //页面改变的时候
  changePage=(page, pageSize)=>{
		this.props.dispatch({type:'market/fetchLoadMarket',payload:{page:page-1,pageSize:6,siteId:2}})
		this.setState({
			form:{
				...this.state.form,
				page:page-1
			}
		})
  }
  //搜索按钮
  toSearch=()=>{
    this.props.dispatch({type:'market/fetchLoadMarket',payload:this.state.form});
  }
  //搜索事件
  inputSearch=(attr,event)=>{
    this.setState({
      form:{
        ...this.state.form,
        [attr]:event.target.value
      }
    })
  }
  //跳转
  toMarketDetails=(record)=>{
    // console.log(record.id);
    router.push('/market/marketDetails');
    this.props.dispatch({type:'market/getMarketId',payload:{page:0,pageSize:6,siteId:2,id:record.id}});
  }
  render(){
    const columns = [
      {
        title: '推广员ID',
        width: 80,
        // dataIndex: 'id',
        key: 'id',
        fixed: 'left',
        render:(text,record)=>{
          return(
            <a onClick={this.toMarketDetails.bind(this,record)}>{record.id}</a>
          )
        }
      },
      { title: '用户名', dataIndex: 'username', key: '1' },
      { title: '手机号', dataIndex: 'telephone', key: '2' },
      { title: 'QQ', dataIndex: 'qq', key: '3' },
      { title: '微信', dataIndex: 'wxid', key: '4' },
      { title: '推广商家数', dataIndex: 'address', key: '5' },
      { title: '账户余额', dataIndex: 'address', key: '6' },
      { title: '累积分成金额', dataIndex: 'address', key: '7' },
      { title: '订单分成比例', dataIndex: 'ratio', key: '8' },
      { title: '上次登录时间', dataIndex: 'lastLoginTime', key: '9' },
      { 
        title: '状态', 
        // dataIndex: 'address', 
        key: '10' ,
        render:(text,record)=>{
          if(record.enabled===true){
            return(
              <div style={{color:'green'}}>正常</div>
            )
          }else if(record.enabled===false){
            return(
              <div style={{color:'red'}}>停用</div>
            )
          }
        }
      },
      { title: '备注', dataIndex: 'comment', key: '11' },
      {
        title: '操作',
        key: 'operation',
        fixed: 'right',
        width: 80,
        render: (text,record) => {
          return(
            <div>
              <Icon type="edit" style={{color:'orange'}} title="修改基本信息"/> &nbsp;&nbsp;
              <Icon type="transaction" style={{color:'red'}} title="结算"/>
            </div>
          )
        }
      },
    ];
    return (
      <div className={styles.content}>
        <div className={styles.content_title}>推广员管理</div>
        <div className={styles.content_search}>
            <div style={{display:'inline-block'}}>
              <Button type="primary">
                新增
              </Button>
              <Button type="primary" style={{marginRight:309}}>导出</Button>
            </div>
            <Input type="text" placeholder="推广员ID" onChange={this.inputSearch.bind(this,'id')}/>
            <Input type="text" placeholder="手机号" onChange={this.inputSearch.bind(this,'telephone')}/>
            <Input type="text" placeholder="用户名" onChange={this.inputSearch.bind(this,'username')}/>
            <Input type="text" placeholder="QQ" onChange={this.inputSearch.bind(this,'qq')}/>
            <Input type="text" placeholder="微信" onChange={this.inputSearch.bind(this,'wxid')}/>
            <Button type="primary" icon="search" onClick={this.toSearch}>
              Search
            </Button>
        </div>
        <Table columns={columns} className={styles.News_table} rowKey="id" bordered
        dataSource={this.props.market.marketData} 
        scroll={{ x: 1300 }} 
        pagination={
          {
            total:this.props.market.total,
            pageSize:6,
            onChange:this.changePage
          }
        } 
        />
      </div>
    )
  }
}

export default connect(state=>state)(Market);