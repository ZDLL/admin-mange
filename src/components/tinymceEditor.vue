<template>
    <div>
         <editor id="tinymce" v-model="value" :init="init"></editor>
    </div>
  
   
</template>
<script>
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver'
import 'tinymce/plugins/image'// 插入上传图片插件
// import 'tinymce/plugins/media'// 插入视频插件
// import 'tinymce/plugins/table'// 插入表格插件
import 'tinymce/plugins/lists'// 列表插件
import 'tinymce/plugins/paste'
// import 'tinymce/plugins/wordcount'// 字数统计插件
export default {
    components: {
        Editor
    },
    // props: {
    //     value: {
    //         type: String,
    //         default: '您想说点什么'
    //     },
    //     disabled: {
    //         type: Boolean,
    //         default: false
    //     },
    //     plugins: {
    //         type: [String, Array],
    //         default: 'lists image media table'
    //     },
    //     toolbar: {
    //         type: [String, Array],
    //         default: 'undo redo |  formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table | removeformat'
    //     }
    // },
    data () {
        let _this =this
         let globalcounter = 1
        return {
        init: {
            language_url: '/tinymce/langs/zh_CN.js',
            language: 'zh_CN',
            skin_url: '/tinymce/skins/ui/oxide',
            height: 500,
            plugins: 'lists image paste',
            toolbar: 'undo redo |  formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image | removeformat paste',
            branding: false,
            menubar: false,
            convert_urls: false ,
            image_advtab: false, //开启图片上传的高级选项功能
            value:_this.value,
            // 此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
            // 如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
            images_upload_credentials:true,
            paste_as_text: true,
            paste_data_images: true, // 粘贴的同时能把内容里的图片自动上传，非常强力的功能
          
            images_upload_url:"/backend/common/uploadwords",
            // images_upload_base_path: util.baseURL, // 图片上传的基本路径
            images_reuse_filename: true,
            image_title:false,
            automatic_uploads:true,
            // images_upload_handler: (blobInfo, success, failure) => {
            //     _this.imgUpload(blobInfo.blob(),function(data){
            //         console.log(data)
            //         success(data)
            //     })
            // },
            paste_preprocess: function(plugin, args) {
                // args.content = args.content.replace("<img", "<img id=\"pasted_image_" + parseInt(globalcounter) + "\"");
                args.content += ' preprocess';
                // args.content = args.content.replace("<img", "<img id=\"pasted_image_" + parseInt(globalcounter) + "\"");
                // console.log(args.content)
            }
        },
        myValue: "",
        value:"",
        }
    },
    mounted () {
        tinymce.init({})
    },
    methods: {
        async imgUpload(file,callbak){
            let formData = new FormData();
            formData.append("file", file);
            await this.$store.dispatch("comModule/getFileImge",formData)
            let data = this.$store.state.comModule.quillImg;
            // this.file = inputDom.files;
            callbak(data)
        },
        // 添加相关的事件，可用的事件参照文档=> https://github.com/tinymce/tinymce-vue => All available events
        // 需要什么事件可以自己增加
        onClick (e) {
            console.log("sssssssssssssssss")
             this.$emit('onClick', e, tinymce)
        },
        // 可以添加一些自己的自定义事件，如清空内容
        clear () {
            this.myValue = '';
        },
        getcont(){
              console.log(tinyMCE.activeEditor.getContent() )
        }
    },
    // watch: {
    //     value (newValue) {
    //         this.myValue = newValue
    //     },
    //     myValue (newValue) {
          
    //        console.log(tinyMCE.activeEditor.getContent() )
    //     // this.$emit('input', newValue)
    //     }
    // }
}
</script>
<style lang="scss">

</style>