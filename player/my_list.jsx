const types = {
    type: 'MY_LIST_WIDGET',
    icon: 'https://static.codemao.cn/appcraft/extension-widgets/production/blink-button.svg',
    title: '我的列表',
    isInvisibleWidget: false,
    isGlobalWidget: false,
    platforms: ['web', 'android', 'ios'],
    properties: [
      {
        key: '__width',
        label: '宽度',
        valueType: 'number',
        defaultValue: 68,
      },
      {
        key: '__height',
        label: '高度',
        valueType: 'number',
        defaultValue: 40,
      },
      {
        key: 'json',
        label: 'JSON',
        valueType: 'string',
        defaultValue: '{}'
      },
      {
        key: 'arrayName',
        label: '数组段名',
        valueType: 'string',
        defaultValue: 'hot'
      },
      {
        key: 'listTitle',
        label: '列表标题',
        valueType: 'string',
        defaultValue: '影视列表'
      },
      {
        key: 'link',
        label: '链接段名',
        valueType: 'string',
        defaultValue: ''
      },
      {
        key: 'linkprefix',
        label: '链接前缀',
        valueType: 'string',
        defaultValue: ''
      },
  
    ],
    methods: [],
    events: [
      {
        key: 'onClick',
        label: '项目被点击',
        params: [
          {
            key: 'json',
            label: '项目数据',
            valueType: 'string',
          },
          {
            key: 'text',
            label: '项目文本',
            valueType: 'string',
          },
        ],
      }
  
    ],
  };
  
  class BlinkButtonWidget extends VisibleWidget {
    constructor(props) {
      super(props);
      this.json = props.json
      this.arrayName = props.arrayName
      this.listTitle = props.listTitle
      this.link = props.link
      this.linkprefix = props.linkprefix
    }
  
    getvalue(obj, propname) {
      var chain = propname.split('.');
      for (let key of chain) {
        console.log(key, obj[key])
        if (obj[key]) {
          obj = obj[key]
        }
      }
      return obj
    }
  
    getjsonobj() {
      console.log(this.arrayName, this.listTitle, this.subDataName)
      if (json == "") return;
      var obj = JSON.parse(this.json)
      var video_name = obj['name']
      obj = this.getvalue(obj, this.arrayName)
      console.log('obj=', obj)
      if (obj && obj.map) {
        //if (this.link == "") {
        //console.log("无链接")
        return obj.map((item, index) =>
        (<li style={{ 'list-style': 'auto' }}>
          <a onClick={() => { return this.onClick(item) }}
            href="javascript:void(0)">{item["name"]}{item['year'] ? `(${item['year']})` : ''}</a>
          <a target='_blank' style={{'float':'right'}} href={`${this.linkprefix}url=${item[this.link]}&title=${video_name}-${item['name']}`}>{this.link == "" ? '' : '(在浏览器中打开)'}</a></li>
        ))
        /*} else {
          console.log("有链接")
          return obj.map((item, index) => (<li style={{'list-style': 'auto'}}><a
            onClick={() => { return this.onClick(item) }}
            href={`${this.linkprefix}${item[this.link]}`} target='_blank'>{item["name"]}{item['year']?`(${item['year']})`:''}</a></li>))
        }*/
      } else {
        return
      }
    }
  
    onClick = (item) => {
      console.log(item)
      this.emit('onClick', JSON.stringify(item), item["name"]);
    };
    render() {
      return (
        <div
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            overflow: 'auto',
          }}
        ><h1>{this.listTitle}</h1><div>{this.getjsonobj()}</div></div>
      );
      //.data.map((item,index)=>(<li>{item.name}</li>))
    }
  }
  
  exports.types = types
  exports.widget = BlinkButtonWidget