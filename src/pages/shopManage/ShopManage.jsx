import React from 'react';
import {Input,Button,Table,Select,Icon,Modal,Form,Checkbox} from 'antd';
import {connect} from 'dva';
import styles from './shopManage.less';
class ShopManage extends React.Component {
  constructor(props) {
    super(props);
    this.state=({
      form:{
        page:0,
        pageSize:6,
      }
  })
}
componentWillMount(){
  // console.log(this.props,'-----------------------');
  this.props.dispatch({type:'shop/fetchLoadShop',payload:this.state.form});
}
//页面改变的时候
changePage=(page, pageSize)=>{
  this.props.dispatch({type:'shop/fetchLoadShop',payload:{page:page-1,pageSize:6}})
  this.setState({
    form:{
      ...this.state.form,
      page:page-1
    }
  })
}
//搜索
toSearch=()=>{
  this.props.dispatch({type:'shop/fetchLoadShop',payload:this.state.form});
}
//所属平台搜索
platformSearch=(value)=>{
  this.setState({
    form:{
      ...this.state.form,
      platform:value
    }
  })
}
//
businesIdSearch=(event)=>{
  this.setState({
    form:{
      ...this.state.form,
      businesId:event.target.value
    }
  })
}
//状态搜索
statusSearch=(value)=>{
  this.setState({
    form:{
      ...this.state.form,
      status:value
    }
  })
}
  render(){
    const columns=[{
      title:'店铺ID',
      align:'center',
      dataIndex:'id',
    },{
      title:'商家ID',
      align:'center',
      dataIndex:'businesId',
    },{
      title:'商家手机号',
      align:'center',
      dataIndex:'telephone',
    },{
      title:'店铺名称',
      align:'center',
      dataIndex:'name',
    },{
      title:'店铺旺旺ID',
      align:'center',
      dataIndex:'wwid',
    },{
      title:'所属平台',
      align:'center',
      dataIndex:'platform',
    },{
      title:'接单间隔时间',
      align:'center',
      dataIndex:'intervalTime',
    },{
      title:'注册时间',
      align:'center',
      dataIndex:'bindTime',
    },{
      title:'店铺状态',
      align:'center',
      dataIndex:'status',
    },{
      title:'店铺状态',
      align:'center',
      dataIndex:'status',
    },{
      title:'操作',
      align:'center',
      render:(text,record)=>{

      }
    }
  ]
    return (
      <div className={styles.content}>
        <div className={styles.content_title}>店铺管理</div>
        <div className={styles.content_search}>
              <Button type="primary" style={{marginRight:555}}>
                导出
              </Button>
            <Select placeholder="所属平台" style={{width: 120}} onChange={this.platformSearch}>
              <Option value="天猫">天猫</Option>
              <Option value="京东">京东</Option>
            </Select>
            <Input type="text" placeholder="商家ID" onChange={this.businesIdSearch}/>
            <Select placeholder="店铺状态" style={{width: 180}} onChange={this.statusSearch}>
              <Option value="0" >待审核</Option>
              <Option value="1" >审核通过</Option>
              <Option value="2" >审核未通过</Option>
            </Select>
            <Button type="primary" icon="search" onClick={this.toSearch}>
              Search
            </Button>
        </div>
        <Table size="small" className={styles.News_table} rowKey="id"
          pagination={
            {
              total:this.props.shop.total,
              pageSize:6,
              onChange:this.changePage
            }
          } 
          bordered
          dataSource={this.props.shop.shopData}
          columns={columns}
        />
      </div>
    )
  }
}

export default connect(state=>state)(ShopManage);