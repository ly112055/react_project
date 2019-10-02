import React from 'react';
import styles from './newsCenter.less';
import {Input,Button,Table,Select,Icon,Modal,Form,Checkbox} from 'antd';
import {connect} from 'dva';
import dateParse from '@/filter/index';
const {Option}=Select;
const { TextArea } = Input;
class NewsCenter extends React.Component {
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
    this.props.dispatch({type:'news/fetchLoadNews',payload:this.state.form});
  }
  //页面改变的时候
  changePage=(page, pageSize)=>{
		this.props.dispatch({type:'news/fetchLoadNews',payload:{page:page-1,pageSize:6,siteId:2}})
		this.setState({
			form:{
				...this.state.form,
				page:page-1
			}
		})
  }
  changeStatus=(record)=>{
    if(record.status=='未发布'){
      // console.log('123');
      this.props.dispatch({type:'news/fetchChangeNewsStatus',payload:{page:this.state.form,forms:{id:record.id,status:'已发布'}}})
    }else if(record.status=='已发布'){
      // console.log('321');
      this.props.dispatch({type:'news/fetchChangeNewsStatus',payload:{page:this.state.form,forms:{id:record.id,status:'未发布'}}})
    }
  }
  //删除行
  deleteNews=(record)=>{
    // console.log(record.id);
    this.props.dispatch({type:'news/fetchDeleteNews',payload:{page:this.state.form,forms:{id:record.id}}});
  }
  //状态栏搜索
  selectStatus=(value)=>{
    console.log(value,'value');
    this.setState({
      form:{
        ...this.state.form,
        status:value
      }
    })
  }
  //搜索按钮
  toSearch=()=>{
    // console.log(this.state.form,'00000000000000000');
    this.props.dispatch({type:'news/fetchLoadNews',payload:{page:this.state.form}});
  }
  //标题搜索
  inputTitle=(event)=>{
    this.setState({
      form:{
        ...this.state.form,
        title:event.target.value
      }
    })
  }
  //通知人群搜索
  inputReceiver=(value)=>{
    this.setState({
      form:{
        ...this.state.form,
        receiver:value
      },
    })
  }
  //模态框 显示模态框
  toAdd = () => {
    this.setState({
      visible: true,
      addForm:{
        contentSource:123,
        siteId:2,
      },
    });
  };

  toSave = e => {
    console.log(this.state.addForm,'+++++++++++++++');
    this.props.dispatch({type:'news/fetchSaveNews',payload:{page:this.state.form,forms:this.state.addForm}})
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  addModalChange=(attr,event)=>{
    this.setState({
      addForm:{
        ...this.state.addForm,
        [attr]:event.target.value
      }
    })
  }
  addModalChange2=(value)=>{
    // console.log(value.toString());
    this.setState({
      addForm:{
        ...this.state.addForm,
        receiver:value.toString()
      }
    })
  }
  //编辑
  editNews=(record)=>{
    console.log(record,'==============');
    this.setState({
      visible: true,
      addForm:{
        ...this.state.addForm,
        title:record.title,
        receiver:record.receiver,
        content:record.content,
        id:record.id,
        status:record.status
      }
    });
  }
  render(){
    // console.log(this.state.addForm,'1111111111111111111111');
    // console.log(this.props,'-----------------------');
    const columns = [
      {
        title:'标题',
        align:'center',
        dataIndex:'title',
        render: text => <a>{text}</a>
      },{
        title:'状态',
        align:'center',
        dataIndex:'status',
        render:(text,record)=>{
          if(text=='已发布'){
            return(
              <div style={{color:'green'}}>{text}</div>
            )
          }else if(text=='未发布'){
            return(
              <div style={{color:'red'}}>{text}</div>
            )
          }
        }
      },{
        title:'通知人群',
        align:'center',
        dataIndex:'receiver'
      },
      {
        title:'创建时间',
        align:'center',
        dataIndex:'createTime',
        render:(text,record)=>{
          return(
            <div>{dateParse(text)}</div>
          )
        }
      },
      {
        title:'发布时间',
        align:'center',
        dataIndex:'publishTime',
        render:(text,record)=>{
          return(
            <div>{dateParse(text)}</div>
          )
        }
      },
      {
        title:'操作',
        align:'center',
        render:(text,record)=>{
          if(record.status=='未发布'){
            return(
              <div>
                <Icon type="edit" style={{color:'orange'}} title="编辑" onClick={this.editNews.bind(this,record)}/> &nbsp;&nbsp;
                <Icon type="check" style={{color:'green'}} title="发布" onClick={this.changeStatus.bind(this,record)}/>&nbsp;&nbsp;
                <Icon type="delete" style={{color:'red'}} title="删除" onClick={this.deleteNews.bind(this,record)}/>
              </div> 
            )
          }else if(record.status=='已发布'){
            return(
              <div>
                <Icon type="edit" style={{color:'orange'}} title="编辑" onClick={this.editNews.bind(this,record)}/> &nbsp;&nbsp;
                <Icon type="close" style={{color:'red'}} title="取消发布" onClick={this.changeStatus.bind(this,record)}/>&nbsp;&nbsp;
                <Icon type="delete" style={{color:'red'}} title="删除" onClick={this.deleteNews.bind(this,record)}/>
              </div> 
            )
          }else{
            return(
              <div>
                <Icon type="edit" style={{color:'orange'}} title="编辑"/> &nbsp;&nbsp;
                <Icon type="delete" style={{color:'red'}} title="删除" onClick={this.deleteNews.bind(this,record)}/>
              </div> 
            )
          }
        }
      }
    ];
    return (
      <div className={styles.content}>
        <div className={styles.content_title}>信息中心</div>
        <div className={styles.content_search}>
            <div style={{display:'inline-block'}}>
              <Button type="primary" style={{marginRight:555}} onClick={this.toAdd}>
                新增
              </Button>
              <Modal
                title="添加信息"
                visible={this.state.visible}
                onOk={this.toSave}
                onCancel={this.handleCancel}
              >
                标题：<Input placeholder="标题" onChange={this.addModalChange.bind(this,'title')} value={this.state.addForm.title}/><br/><br/>
                通知人群:<br/>
                <Checkbox.Group onChange={this.addModalChange2}>
                  <Checkbox value="推广员" checked={this.state.addForm.receiver==="推广员"}>推广员</Checkbox>
                  <Checkbox value="商家">商家</Checkbox>
                </Checkbox.Group><br/><br/>
                内容：
                <TextArea placeholder="输入内容" onChange={this.addModalChange.bind(this,'content')} value={this.state.addForm.content}></TextArea>
              </Modal>
            </div>
            <Select placeholder="状态" style={{width: 120}} onChange={this.selectStatus}>
              <Option value="已发布">已发布</Option>
              <Option value="未发布">未发布</Option>
            </Select>
            <Input type="text" placeholder="公告标题" onChange={this.inputTitle}/>
            <Select placeholder="通知人群" style={{width: 180}} onChange={this.inputReceiver}>
              <Option value="商家">商家</Option>
              <Option value="推广员">推广员</Option>
            </Select>
            <Button type="primary" icon="search" onClick={this.search} onClick={this.toSearch}>
              Search
            </Button>
        </div>
        <Table size="small" className={styles.News_table} rowKey="id"
          pagination={
            {
              total:this.props.news.total,
              pageSize:6,
              onChange:this.changePage
            }
          } 
          bordered
          dataSource={this.props.news.newsData}
          columns={columns}
        />
      </div>
    )
  }
}

export default connect(state=>state)(NewsCenter);