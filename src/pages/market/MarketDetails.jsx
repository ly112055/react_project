import React from 'react';
import { Tabs,Table } from 'antd';
import {connect} from 'dva';
import styles from './marketDetails.less';
import dateParse from '@/filter/index';
const { TabPane } = Tabs;
class MarketDetails extends React.Component{
    constructor(props) {
        super(props);
        this.state=({
            form:{
                page:0,
                pageSize:6,
                siteId:2,
                // id:this.props.market.marketId,
                // AmarketData:this.props.market.AmarketData
              },
        })
        
    }
    callback=(key)=> {
        // console.log(key);
      }
    // componentWillMount(){
    //     this.setState({
    //         form:{
    //             ...this.state.form,
    //             id:this.props.market.marketId
    //         }
            
    //     });
    // }
    // componentWillMount(){
    //     this.props.dispatch({type:'market/fetchLoadMarket',payload:this.state.form})
    // }
    render(){
        const {AmarketData} = this.props.market;
        // console.log(this.props.market.marketId,'1111111');
        // console.log(this.state.form.marketId);
        // console.log(this.props.market.AmarketData,'111111111');
        return(
            <div className={styles.content}>
                <Tabs onChange={this.callback} type="card">
                    <TabPane tab=" 推广员详情" key="1">
                            <div>
                                <div>【基本信息】</div>
                                <div className={styles.content_row}>
                                    <div style={{textAlign:'right'}}>推广员ID:</div>
                                    <div>{AmarketData.id}</div>
                                    <div style={{textAlign:'right'}}>用户名:</div>
                                    <div>{AmarketData.username}</div>
                                </div>
                                <div className={styles.content_row}>
                                    <div style={{textAlign:'right'}}>QQ:</div>
                                    <div>{AmarketData.qq}</div>
                                    <div style={{textAlign:'right'}}>手机号:</div>
                                    <div>{AmarketData.telephone}</div>
                                </div>
                                <div className={styles.content_row}>
                                    <div style={{textAlign:'right'}}>微信号:</div>
                                    <div>{AmarketData.wxid}</div>
                                    <div style={{textAlign:'right'}}>注册时间:</div>
                                    <div>{dateParse(AmarketData.registerTime)}</div>
                                </div>
                                <div className={styles.content_row}>
                                    <div style={{textAlign:'right'}}>上次登录时间:</div>
                                    <div>{AmarketData.lastLoginTime}</div>
                                    <div style={{textAlign:'right'}}>状态:</div>
                                    <div>{AmarketData.enabled}</div>
                                </div>
                                <div className={styles.content_row}>
                                    <div style={{textAlign:'right'}}>备注:</div>
                                    <div>{AmarketData.comment}</div>
                                    <div></div>
                                    <div></div>
                                </div>
                            </div>
                    </TabPane>
                    <TabPane tab="账户信息" key="2">
                    Content of Tab Pane 2
                    </TabPane>
                    <TabPane tab="推广商家" key="3">
                    Content of Tab Pane 3
                    </TabPane>
                    <TabPane tab="资金日志" key="4">
                    Content of Tab Pane 4
                    </TabPane>
                </Tabs>
            </div>
        )
    }
    
}
export default connect(state=>state)(MarketDetails)