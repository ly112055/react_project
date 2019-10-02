import React from 'react';
import { Tabs,Table } from 'antd';
import {connect} from 'dva';
import styles from './businessDetails.less';
const { TabPane } = Tabs;
class BusinessDetails extends React.Component {
 constructor(props) {
     super(props);
     this.state=({
         form:{
            page:0,
            pageSize:6,
            siteId:2
         },
     })
 }
 componentWillMount(){
     this.setState({
         form:{
             ...this.state.form,
             id:this.props.business.businessId
         }
     })
 }
  componentDidMount(){
    //   console.log(this.state.form,'66666');
    // console.log(this.props.business.businessId,'999999999999999');
    this.props.dispatch({type:'business/fetchLoadBusiness',payload:this.state.form});
  }    
  render(){
    const {AbusinessData} = this.props.business;
    // console.log(this.props.business.AbusinessData,'999999999999999');
    const columns2=[{
        title:'订单ID',
        align:'center',
        dataIndex:'telephone',
      },{
        title:'任务ID',
        align:'center',
        dataIndex:'qq',
      },{
        title:'商家ID',
        align:'center',
        dataIndex:'accountBj',
      },{
        title:'任务类型',
        align:'center',
        dataIndex:'accountYj',
      },{
        title:'商家押金',
        align:'center',
        dataIndex:'allRechargeCount',
      },{
        title:'商家支付佣金',
        align:'center',
        dataIndex:'businesSifuId',
      }
    ];
    const columns3=[{
        title:'订单ID',
        align:'center',
        dataIndex:'telephone',
      },{
        title:'任务ID',
        align:'center',
        dataIndex:'qq',
      },{
        title:'任务类型',
        align:'center',
        dataIndex:'accountBj',
      },{
        title:'商品名称',
        align:'center',
        dataIndex:'accountYj',
      },{
        title:'接单时间',
        align:'center',
        dataIndex:'allRechargeCount',
      },{
        title:'接单账号',
        align:'center',
        dataIndex:'businesSifuId',
      },
      {
        title:'商家押金',
        align:'center',
        dataIndex:'businesSifuId',
      },{
        title:'买手付款',
        align:'center',
        dataIndex:'businesSifuId',
      },{
        title:'商家返款',
        align:'center',
        dataIndex:'businesSifuId',
      },{
        title:'电商订单号',
        align:'center',
        dataIndex:'businesSifuId',
      },{
        title:'订单状态',
        align:'center',
        dataIndex:'businesSifuId',
      },
    ];
    const columns4=[{
        title:'订单ID',
        align:'center',
        dataIndex:'telephone',
      },{
        title:'任务ID',
        align:'center',
        dataIndex:'qq',
      },{
        title:'任务类型',
        align:'center',
        dataIndex:'accountBj',
      },{
        title:'商品名称',
        align:'center',
        dataIndex:'accountYj',
      },{
        title:'接单时间',
        align:'center',
        dataIndex:'allRechargeCount',
      },{
        title:'完成时间',
        align:'center',
        dataIndex:'allRechargeCount',
      },{
        title:'接单账号',
        align:'center',
        dataIndex:'businesSifuId',
      },
      {
        title:'商家押金',
        align:'center',
        dataIndex:'businesSifuId',
      },{
        title:'用户付款',
        align:'center',
        dataIndex:'businesSifuId',
      },{
        title:'商家返款',
        align:'center',
        dataIndex:'businesSifuId',
      },{
        title:'电商订单号',
        align:'center',
        dataIndex:'businesSifuId',
      }
    ];
    const columns5=[{
        title:'订单ID',
        align:'center',
        dataIndex:'telephone',
      },{
        title:'任务ID',
        align:'center',
        dataIndex:'qq',
      },{
        title:'商品名称',
        align:'center',
        dataIndex:'accountYj',
      },{
        title:'接单时间',
        align:'center',
        dataIndex:'allRechargeCount',
      },{
        title:'接单账号',
        align:'center',
        dataIndex:'businesSifuId',
      },
      {
        title:'商家押金',
        align:'center',
        dataIndex:'businesSifuId',
      },{
        title:'撤销时间',
        align:'center',
        dataIndex:'businesSifuId',
      },{
        title:'撤销原因',
        align:'center',
        dataIndex:'businesSifuId',
      },{
        title:'撤销人',
        align:'center',
        dataIndex:'businesSifuId',
      }
    ];
    const columns6=[{
        title:'所属平台',
        align:'center',
        dataIndex:'telephone',
      },{
        title:'店铺名称',
        align:'center',
        dataIndex:'qq',
      },{
        title:'旺旺ID',
        align:'center',
        dataIndex:'accountYj',
      },{
        title:'店铺网址',
        align:'center',
        dataIndex:'allRechargeCount',
      },{
        title:'绑定时间',
        align:'center',
        dataIndex:'businesSifuId',
      },
      {
        title:'店铺审核状态',
        align:'center',
        dataIndex:'businesSifuId',
      }
    ];
    const columns7=[{
        title:'充值ID',
        align:'center',
        dataIndex:'telephone',
      },{
        title:'充值金额',
        align:'center',
        dataIndex:'qq',
      },{
        title:'收款银行',
        align:'center',
        dataIndex:'accountYj',
      },{
        title:'充值时间',
        align:'center',
        dataIndex:'allRechargeCount',
      },{
        title:'审核时间',
        align:'center',
        dataIndex:'businesSifuId',
      },
      {
        title:'备注',
        align:'center',
        dataIndex:'businesSifuId',
      }
    ];
    const columns8=[{
      title:'变动时间',
      align:'center',
      dataIndex:'telephone',
    },{
      title:'变动账户',
      align:'center',
      dataIndex:'qq',
    },{
      title:'变动金额',
      align:'center',
      dataIndex:'accountYj',
    },{
      title:'账户余额',
      align:'center',
      dataIndex:'allRechargeCount',
    },{
      title:'任务ID',
      align:'center',
      dataIndex:'businesSifuId',
    },
    {
      title:'订单',
      align:'center',
      dataIndex:'businesSifuId',
    },{
      title:'备注',
      align:'center',
      dataIndex:'businesSifuId',
    }
  ];
    return (
      <div className={styles.content}>
        <Tabs type="card">
            <TabPane tab="商家详情" key="1">
                <div>基本信息</div><br/>
                <div>
                    <div>【基本信息】</div>
                    <div className={styles.content_row}>
                        <div style={{textAlign:'right'}}>商家ID:</div>
                        <div>{AbusinessData.id}</div>
                        <div style={{textAlign:'right'}}>名称:</div>
                        <div>{AbusinessData.username}</div>
                    </div>
                    <div className={styles.content_row}>
                        <div style={{textAlign:'right'}}>来源:</div>
                        <div>{AbusinessData.site.domain}</div>
                        <div style={{textAlign:'right'}}>注册时间:</div>
                        <div>{AbusinessData.registerTime}</div>
                    </div>
                    <div className={styles.content_row}>
                        <div style={{textAlign:'right'}}>手机号:</div>
                        <div></div>
                        <div style={{textAlign:'right'}}>QQ号:</div>
                        <div></div>
                    </div>
                    <div className={styles.content_row}>
                        <div style={{textAlign:'right'}}>备注:</div>
                        <div>{AbusinessData.comment}</div>
                        <div style={{textAlign:'right'}}>状态:</div>
                        <div>{AbusinessData.status}</div>
                    </div>
                    <div className={styles.content_row}>
                        <div style={{textAlign:'right'}}>用户等级:</div>
                        <div>{AbusinessData.rank}</div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
                <div>
                    <div>【账号信息】</div>
                    <div className={styles.content_row}>
                        <div style={{textAlign:'right'}}>本金余额:</div>
                        <div></div>
                        <div style={{textAlign:'right'}}>佣金余额:</div>
                        <div></div>
                    </div>
                    <div className={styles.content_row}>
                        <div style={{textAlign:'right'}}>累积充值:</div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </TabPane>

            <TabPane tab="代接订单" key="2">
                <div style={{borderBottom:'3px solid rgba(0,0,0,0.1)'}}>接待订单</div><br/>
                <Table size="small" className={styles.News_table} rowKey="id"
                    pagination={
                        {
                        // total:this.props.business.total,
                        pageSize:6,
                        onChange:this.changePage
                        }
                    } 
                    bordered
                    // dataSource={this.props.business.businessData}
                    columns={columns2}
                />
            </TabPane>

            <TabPane tab="进行中订单" key="3">
                <div style={{borderBottom:'3px solid rgba(0,0,0,0.1)'}}>进行中订单</div><br/>
                <Table size="small" className={styles.News_table} rowKey="id"
                    pagination={
                        {
                        // total:this.props.business.total,
                        pageSize:6,
                        onChange:this.changePage
                        }
                    } 
                    bordered
                    // dataSource={this.props.business.businessData}
                    columns={columns3}
                />
            </TabPane>

            <TabPane tab="已完成的订单" key="4">
                <div style={{borderBottom:'3px solid rgba(0,0,0,0.1)'}}>已完成的订单</div><br/>
                <Table size="small" className={styles.News_table} rowKey="id"
                    pagination={
                        {
                        // total:this.props.business.total,
                        pageSize:6,
                        onChange:this.changePage
                        }
                    } 
                    bordered
                    // dataSource={this.props.business.businessData}
                    columns={columns4}
                />
            </TabPane>

            <TabPane tab="已撤销订单" key="5">
                <div style={{borderBottom:'3px solid rgba(0,0,0,0.1)'}}>已撤销订单</div><br/>
                <Table size="small" className={styles.News_table} rowKey="id"
                    pagination={
                        {
                        // total:this.props.business.total,
                        pageSize:6,
                        onChange:this.changePage
                        }
                    } 
                    bordered
                    // dataSource={this.props.business.businessData}
                    columns={columns5}
                />
            </TabPane>

            <TabPane tab="绑定店铺" key="6">
                <div style={{borderBottom:'3px solid rgba(0,0,0,0.1)'}}>绑定店铺</div><br/>
                <Table size="small" className={styles.News_table} rowKey="id"
                    pagination={
                        {
                        // total:this.props.business.total,
                        pageSize:6,
                        onChange:this.changePage
                        }
                    } 
                    bordered
                    // dataSource={this.props.business.businessData}
                    columns={columns6}
                />
            </TabPane>

            <TabPane tab="充值记录" key="7">
                <div style={{borderBottom:'3px solid rgba(0,0,0,0.1)'}}>充值记录</div><br/>
                <Table size="small" className={styles.News_table} rowKey="id"
                    pagination={
                        {
                        // total:this.props.business.total,
                        pageSize:6,
                        onChange:this.changePage
                        }
                    } 
                    bordered
                    // dataSource={this.props.business.businessData}
                    columns={columns7}
                />
            </TabPane>

            <TabPane tab="资金日志" key="8">
                <div style={{borderBottom:'3px solid rgba(0,0,0,0.1)'}}>资金日志</div><br/>
                <Table size="small" className={styles.News_table} rowKey="id"
                    pagination={
                        {
                        // total:this.props.business.total,
                        pageSize:6,
                        onChange:this.changePage
                        }
                    } 
                    bordered
                    // dataSource={this.props.business.businessData}
                    columns={columns8}
                />
            </TabPane>
        </Tabs>
      </div>
    )
  }
}

export default connect(state=>state)(BusinessDetails);