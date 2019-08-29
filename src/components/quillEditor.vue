<!--重新封装的quillEditor组件--->
<template>
  <div class="my-quill-editor">
    <input style="display:none" type="file" multiple @change="updata" ref="contentUpload" id="QuillUploaderImg" />
    <quill-editor
      class="editor"
      v-model="editorCont"
      ref="myQuillEditor"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @change="onEditorChange($event)"
    >{{parentEditorCont}}</quill-editor>
  </div>
</template>
<script>
import { Quill,quillEditor } from "vue-quill-editor";

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
  ["blockquote", "code-block"], // 引用  代码块
  [{ header: 1 }, { header: 2 }], // 1、2 级标题
  [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
  [{ script: "sub" }, { script: "super" }], // 上标/下标
  [{ indent: "-1" }, { indent: "+1" }], // 缩进
  // [{'direction': 'rtl'}],                         // 文本方向
  [{ size: ["small", false, "large", "huge"] }], // 字体大小
  [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
  [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
  [{ font: [] }], // 字体种类
  [{ align: [] }], // 对齐方式
  ["clean"], // 清除文本格式
  ["link", "image"], // 链接、图片、视频
  ['sourceEditor']
];
export default {
  name: "quilleditor",
  props: ["parentEditorCont"],
  data() {
    let _this = this;
    return {
      editorOption: {
        placeholder: "你想说点什么",
        theme: 'snow',  
        modules: {
          toolbar: {
            container: toolbarOptions,
            handlers: {
              image: function(value) {
               
                if (value) {
                  // 触发input框选择图片文件
                  document.querySelector("#QuillUploaderImg").click();
                } else {
                  this.quill.format("image", false);
                }
              },
              shadeBox:null,
              sourceEditor: function(){     //添加工具方法
                   let quill = _this.$refs.myQuillEditor.quill;  
                   let range = quill.getSelection();
                    quill.insertEmbed(range.index,"div","null")
                    // quill.insertEmbed(range.index, 'div');
                    quill.setSelection(range.index + 1);
                  // quill.pasteHTML(quill.getSelection().index, '<div>');
              }
            }
          }
        }
      },
      editorCont: this.parentEditorCont || "",
      file: "",
      top:"",
      scrollObj:""
    }
  },
  methods: {
    onEditorBlur(e) {
      let scrollObj = document.getElementById("searchBar"); // 滚动区域
      this.top = scrollObj.scrollTop;
    },
    onEditorFocus(e) {
      let scrollObj = document.getElementById("searchBar"); // 滚动区域
      let quillDome = document.getElementsByClassName("editor")[0]
      let st= scrollObj.scrollTop?scrollObj.scrollTop:this.top
      let quill = this.$refs.myQuillEditor.quill;
      let range = quill.getSelection();
      let ran = range.index>260?range.index*1.2:range.index
      let num = st && st>range.index?st:(st?(st+ran)/2:(0+ran)/2)
      //  let num = st?(st+ran)/2:(0+ran)/2
      // console.log("range.index---:"+ran)
      // console.log("st----:"+st)
      this.$emit("quillEditorScrollTop", num);
    },
    onEditorChange({ quill, html, text }) {
      console.log(quill)
      // let quill = this.$refs.myQuillEditor.quill;
      // let scrollObj = document.getElementById("searchBar"); // 滚动区域
      // let range = quill.getSelection();
      this.$emit("quillEditorFun", this.editorCont);
    },
    async updata() {
      let inputDom = this.$refs.contentUpload;
      let quill = this.$refs.myQuillEditor.quill;
      let range = quill.getSelection();
      let formData = new FormData();
      this.file = inputDom.files;
      if( this.file.length>0){
        for(let i=0;i< this.file.length;i++){
            formData.append("file", this.file[i]);
            await this.$store.dispatch("comModule/getFileImge",formData)
            let data = this.$store.state.comModule.quillImg;
            if (data) {
              quill.insertEmbed(range.index + i, "image",data);
              quill.setSelection(range.index + (i+1));
            } else {
              console.log("图片插入失败");
            }
        }
        
      }
     
    },
    initButton:function(){      //在使用的页面中初始化按钮样式
      const sourceEditorButton = document.querySelector('.ql-sourceEditor');
      sourceEditorButton.style.cssText = "width:20px;color:#333";
      // sourceEditorButton.innerText="源码编辑";
       sourceEditorButton.classList.add('el-icon-minus');
       sourceEditorButton.title = "添加横线";

    },
    register(q){
      //注册标签(因为在富文本编辑器中是没有div,table等标签的，需要自己去注册自己需要的标签)
      class Div extends q.import('blots/block/embed') {
         static create(value) {
                let node = super.create(value);
                node.setAttribute('style', "height:0px; margin-top:10px; margin-bottom:10px;border: 0.5px solid #dcdcdc;height:1px;");
                return node;
            }
      }
      Div.blotName = 'div';
      Div.tagName = 'div';
      q.register(Div);
    },
  },
  mounted() {
   this.initButton();
   
  },
  created(){
    this.register(Quill)
  }
};
</script>
<style lang="scss">
//  .editor p{
//     text-align: center
//   }
.my-quill-editor {
  em{
    font-style: italic;
  }
  strong{
    font-weight: bold
  }
  position: relative;
 
  .editor{
    // width: 850px;
    .ql-toolbar{
      z-index: 200;
    }
  }
  .ql-toolbar-fixed{
    position: fixed;
    left: 240px;
    top:60px;
    background-color: #fff;
    width: calc(100% - 298px);
  }
  .editorPaddind{
    padding-top: 50px;
  }
  .ql-container .ql-snow {
    min-height: 200px;
  }

  // 富文本
  .ql-tooltip {
    left: 0 !important;
  }
  .editor {
    line-height: normal !important;
    // height: 800px;
  }
  .ql-container.ql-snow {
    min-height: 200px;
  }
  .ql-snow .ql-tooltip[data-mode="link"]::before {
    content: "请输入链接地址:";
  }
  .ql-snow .ql-tooltip.ql-editing a.ql-action::after {
    border-right: 0px;
    content: "保存";
    padding-right: 0px;
  }

  .ql-snow .ql-tooltip[data-mode="video"]::before {
    content: "请输入视频地址:";
  }

  .ql-snow .ql-picker.ql-size .ql-picker-label::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item::before {
    content: "14px";
  }
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="small"]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {
    content: "10px";
  }
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="large"]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="large"]::before {
    content: "18px";
  }
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {
    content: "32px";
  }

  .ql-snow .ql-picker.ql-header .ql-picker-label::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item::before {
    content: "文本";
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
    content: "标题1";
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
    content: "标题2";
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
    content: "标题3";
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
    content: "标题4";
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
    content: "标题5";
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
    content: "标题6";
  }

  .ql-snow .ql-picker.ql-font .ql-picker-label::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item::before {
    content: "标准字体";
  }
  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="serif"]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="serif"]::before {
    content: "衬线字体";
  }
  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="monospace"]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="monospace"]::before {
    content: "等宽字体";
  }
}
</style>

