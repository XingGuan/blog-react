import './index.less';
import logo from '../../assets/test.jpg';
import React, { Component } from 'react';
import { Avatar, message,Icon } from 'antd';
import { Link } from 'react-router-dom';
import https from '../../utils/https';
import urls from '../../utils/urls';

class SliderRight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      keyword: '',
      type: 2, //1 :其他友情链接 2: 是管理员的个人链接 ,‘’ 代表所有链接
      pageNum: 1,
      pageSize: 50,
      total:0,
      totalArticle:0,
      totalLikes:0,
      list: [],
      linkList: [],
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    // this.loadLink = this.loadLink.bind(this);
  }

  componentDidMount() {
    this.handleSearch();
    // this.loadLink();
  }
  // loadLink = () => {
  //   https
  //     .get(urls.getLinkList, {
  //       params: {
  //         type: this.state.type,
  //         keyword: this.state.keyword,
  //         pageNum: this.state.pageNum,
  //         pageSize: this.state.pageSize,
  //       },
  //     })
  //     .then(res => {
  //       if (res.status === 200 && res.data.code === 0) {
  //         this.setState({
  //           linkList: res.data.data.list,
  //         });
  //       } else {
  //         message.error(res.data.message);
  //       }
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  handleSearch = () => {
    https
      .get(urls.getTagList, {
        params: {
          keyword: this.state.keyword,
          pageNum: this.state.pageNum,
          pageSize: this.state.pageSize,
        },
      })
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          this.setState({
            list: res.data.data.list,
            total:res.data.data.count,
            totalArticle:res.data.data.totalArticle,
            totalLikes:res.data.data.totalLikes,


          });
        } else {
          message.error(res.data.message);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleClick(event) {
    this.setState({
      //   [event.target.name]: event.target.value
    });
  }
  render() {
    const list = this.state.list.map((item, i) => (
      <Link
        className="item"
        key={item._id}
        to={`/articles?tag_id=${item._id}&tag_name=${item.name}&category_id=`}
      >
        <span key={item._id}>{item.name}</span>
      </Link>
    ));

    const total=this.state.total;
    const totalArticle=this.state.totalArticle;
    const totalLikes=this.state.totalLikes;
    // const linkChildren = this.state.linkList.map(item => (
    //   <a
    //     key={item._id}
    //     target="_blank"
    //     rel="noopener noreferrer"
    //     href={item.url}
    //   >
    //     <Icon
    //       key={item._id}
    //       type={item.icon}
    //       theme="outlined"
    //       style={{ fontSize: '20px', marginRight: '10px' }}
    //     />
    //   </a>
    // ));

    return (
      <div className="right">
        <Avatar className="right-logo" src={logo} size={130} icon="user" />
        <div className="title">杨园亮</div>
        <div className="right-content">
                  <div className="item">
                    <div className="num">{total}</div>访客总数
                  </div>

					<div className="item">
						<div className="num">{totalArticle}</div>文章
					</div>

					<div className="item">
						<div className="num">{totalLikes}</div>收获喜欢
          </div>
          {/* <div className="footer">{linkChildren}</div> */}
        </div>


        <div className="tags">
          <div className="title">技能标签</div>
          {list}
        </div>
          {/* <div className="content">
            分享 WEB 全栈开发等相关的技术文章，热点资源<br />
            全栈程序员的成长之路
            <img style={{'width':'100%',marginTop: '20px'}} src={BiaoChenXuYing} alt="公众号" />
          </div>
        </div>*/}
      </div>
    );
  }
}

export default SliderRight;
