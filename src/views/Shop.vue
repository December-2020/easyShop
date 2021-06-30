<template>
    <div class="shop">
        <van-search shape="round" @focus="jumpSearch" 
            placeholder="请输入产品名称"
            background="#ff411c"
            show-action
        >
            <template #action>
                <i 
                    :class="['iconfont',isBigPic?'icon-shangpinliebiao1':'icon-shangpinliebiao']"
                    @click="toggleComponent"
                ></i>
            </template>
        </van-search>
        <!-- 标题栏开始 -->
        <div class="title">
            <van-grid>
                <van-grid-item class="red" :text="title"></van-grid-item>
                <van-grid-item  :class="{red:condition.priceOrder!=''}" @click="orderPrice" text="价格">
                    <div class="con">
                        <span>价格</span>
                        <img :src="picon" alt="">
                    </div>
                </van-grid-item>
                <van-grid-item :class="{red:condition.salesOrder!=''}" @click="orderSales" text="销量">
                    <div class="con">
                        <span>销量</span>
                        <img :src="sicon" alt="">
                    </div>
                </van-grid-item>
                <van-grid-item  text="新品"></van-grid-item>
            </van-grid>
        </div>
        <!-- 标题栏结束 -->
        <!-- loading -->
        <van-loading type="spinner" color="#ff411c" size="24" v-show="isLoading"/>
        <!-- 内容开始 -->
        <div class="shopMes">
            <ul v-if="!isBigPic" class="picList">
                <template>
                    <li v-for="item in list" :key="item.id">
                        <shop-item :item="item">
                            <span slot="saleRight">已售 {{item.sales}}件</span>
                        </shop-item>
                    </li>
                </template>
            </ul>
            <ul v-else class="bigPic">
                <template>
                    <li v-for="item in list" :key="item.id">
                        <picture-item :item="item">
                            <div class="price">
                                <div class="t">{{item.price}}</div>
                                <div class="b">
                                    <div class="l">
                                        <span>{{item.vip_price}}</span>
                                        <img :src="vip_url" alt="" v-lazy="vip_url">
                                    </div>
                                    <span>已售{{item.sales}}件</span>  
                                </div>
                            </div>
                        </picture-item>
                    </li>
                </template>
            </ul>
        </div>
    </div>
</template>

<script>
import ShopItem from '../components/ShopItem';
import PictureItem from '../components/PictureItem';
export default {
    props:['id'],
    components:{ShopItem,PictureItem},
    data(){
        return{
            isBigPic:true,
            condition:{
                page: 1,
                limit: 8,
                keyword:'',
                sid: 0, // 分类id
                news: 0,
                priceOrder:'', //asc desc
                salesOrder:'', //asc desc
                isLoad:true,
            },
            list:[],
            isLoading : true,
            vip_url:'',
            title:'',
            picon:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAATCAYAAABPwleqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxMGM0NTk3Mi0xZWRjLTc5NDktYmM5My01MmI5MGUwMjczMTkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjEwRUYxQTkyMTE2MTFFOTk4QUVDRTRFNDMyRTZFNkUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjEwRUYxQTgyMTE2MTFFOTk4QUVDRTRFNDMyRTZFNkUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODJmOGJjOWEtNjNhNi1hZDRkLTk0NTMtYWQxYTg4NTU5YTFhIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjEwYzQ1OTcyLTFlZGMtNzk0OS1iYzkzLTUyYjkwZTAyNzMxOSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PjUxYEEAAAD9SURBVHjaYpw5cyYDDiANxHOAOAmIn2NTwIRDIz8QbwdiDyDeCeUTpZkLiLcBsS6UD6K3QMXxamYD4hVAbIUmbgPEy4GYFZdmRiCeB8S+OLziB8TzoeowNE8A4mgG/AAk34euuRKI8xiIAwVAXAFisABxJhC3MZAGQOo/skBDVpmBdPAXpPkhA5kApFkeiJnJtdkLiKeRoTkLFNrTgbiGRI2g2JkOi6pWIJ5MpMaJQNyBnkjygXgpAY0g+UJsKew/NPttxqFxExAnQtVhzRi/gDgCiI+jiR8F4kgg/k0oS34DYk8gvgzlg2hvqDhRhcFHqAE7gNgdyscAAAEGAGMOLKKfpm4VAAAAAElFTkSuQmCC',
            sicon:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAATCAYAAABPwleqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxMGM0NTk3Mi0xZWRjLTc5NDktYmM5My01MmI5MGUwMjczMTkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjEwRUYxQTkyMTE2MTFFOTk4QUVDRTRFNDMyRTZFNkUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjEwRUYxQTgyMTE2MTFFOTk4QUVDRTRFNDMyRTZFNkUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODJmOGJjOWEtNjNhNi1hZDRkLTk0NTMtYWQxYTg4NTU5YTFhIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjEwYzQ1OTcyLTFlZGMtNzk0OS1iYzkzLTUyYjkwZTAyNzMxOSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PjUxYEEAAAD9SURBVHjaYpw5cyYDDiANxHOAOAmIn2NTwIRDIz8QbwdiDyDeCeUTpZkLiLcBsS6UD6K3QMXxamYD4hVAbIUmbgPEy4GYFZdmRiCeB8S+OLziB8TzoeowNE8A4mgG/AAk34euuRKI8xiIAwVAXAFisABxJhC3MZAGQOo/skBDVpmBdPAXpPkhA5kApFkeiJnJtdkLiKeRoTkLFNrTgbiGRI2g2JkOi6pWIJ5MpMaJQNyBnkjygXgpAY0g+UJsKew/NPttxqFxExAnQtVhzRi/gDgCiI+jiR8F4kgg/k0oS34DYk8gvgzlg2hvqDhRhcFHqAE7gNgdyscAAAEGAGMOLKKfpm4VAAAAAElFTkSuQmCC',
        }
    },
    activated(){
        this.vip_url = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAVCAYAAAA5BNxZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphNmVhODdiZC0zYWY5LTEzNDYtYjYyYy1hZGE1MDVmMDUxMTIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MURGMzA2REQyMDNEMTFFOTkxOUVDOTNCMjU4MDcwQjQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MURGMzA2REMyMDNEMTFFOTkxOUVDOTNCMjU4MDcwQjQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODk2ZWFjMGYtNDI3MC0yZDRlLThiYTItYjE4OTA2YzRiOWVlIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6MDg3NDQyZTItM2M1ZC1iNDRkLTljYmUt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';
        this.title = this.$route.query.title;
        this.condition.sid = this.id;
        // this.$nextTick(){}
        this.search();
    },
    methods:{
        jumpSearch(){
            this.$router.push('/search')
        },
        toggleComponent(){
            this.isBigPic = !this.isBigPic;
        },
        search(){
            this.isLoading = true;
            this.axios.get('/api/products',{
                params:this.condition,
            }).then(d => {
                // console.log(d.data.data);
                this.list = d.data.data;
                this.isLoading = false;
            })
        },
        // 价格
        orderPrice(){
            this.condition.salesOrder = '';
            this.sicon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAATCAYAAABPwleqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxMGM0NTk3Mi0xZWRjLTc5NDktYmM5My01MmI5MGUwMjczMTkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjEwRUYxQTkyMTE2MTFFOTk4QUVDRTRFNDMyRTZFNkUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjEwRUYxQTgyMTE2MTFFOTk4QUVDRTRFNDMyRTZFNkUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODJmOGJjOWEtNjNhNi1hZDRkLTk0NTMtYWQxYTg4NTU5YTFhIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjEwYzQ1OTcyLTFlZGMtNzk0OS1iYzkzLTUyYjkwZTAyNzMxOSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PjUxYEEAAAD9SURBVHjaYpw5cyYDDiANxHOAOAmIn2NTwIRDIz8QbwdiDyDeCeUTpZkLiLcBsS6UD6K3QMXxamYD4hVAbIUmbgPEy4GYFZdmRiCeB8S+OLziB8TzoeowNE8A4mgG/AAk34euuRKI8xiIAwVAXAFisABxJhC3MZAGQOo/skBDVpmBdPAXpPkhA5kApFkeiJnJtdkLiKeRoTkLFNrTgbiGRI2g2JkOi6pWIJ5MpMaJQNyBnkjygXgpAY0g+UJsKew/NPttxqFxExAnQtVhzRi/gDgCiI+jiR8F4kgg/k0oS34DYk8gvgzlg2hvqDhRhcFHqAE7gNgdyscAAAEGAGMOLKKfpm4VAAAAAElFTkSuQmCC';
            if(this.condition.priceOrder == ''){
                this.condition.priceOrder = 'desc';
                this.picon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAATCAYAAABPwleqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxMGM0NTk3Mi0xZWRjLTc5NDktYmM5My01MmI5MGUwMjczMTkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzIyRUYyOEEyMTBFMTFFOTgxNTBERkEyQkU2RTI3NkUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzIyRUYyODkyMTBFMTFFOTgxNTBERkEyQkU2RTI3NkUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODJmOGJjOWEtNjNhNi1hZDRkLTk0NTMtYWQxYTg4NTU5YTFhIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjEwYzQ1OTcyLTFlZGMtNzk0OS1iYzkzLTUyYjkwZTAyNzMxOSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pn93ow0AAAEASURBVHjaYnxprMyAA0gD8RwgTgLi59gUMOHQyA/E24HYA4h3QvlEaeYC4m1ArAvlg+gtUHG8mtmAeAUQW6GJ2wDxciBmxaWZEYjnAbEvDq/4AfF8qDoMzROAOJoBPwDJ96FrrgTiPAbiQAEQV4AYLECcCcRtDKQBkPqPLNCQVWYgHfxl2ZBW9pCBTACyWR6ImcmyGUh4AfE0MjRngUJ7OhDXkKgRFDvTYVHVCsSTidQ4EYg70BNJPhAvJaARJF+ILYX9h2a/zTg0bgLiRKg6rBnjFxBHAPFxNPGjQBwJxL8JZclvQOwJxJehfBDtDRUnqjD4CDVgBxC7Q/kYACDAAJfhLaK8zH0rAAAAAElFTkSuQmCC';
            }else if(this.condition.priceOrder == 'desc'){
                this.condition.priceOrder = 'asc';
                this.picon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAATCAYAAABPwleqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxMGM0NTk3Mi0xZWRjLTc5NDktYmM5My01MmI5MGUwMjczMTkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTFCNkQ5Q0IyMTBFMTFFOTk4NDBDMUY1MDFFRUREREYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTFCNkQ5Q0EyMTBFMTFFOTk4NDBDMUY1MDFFRUREREYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODJmOGJjOWEtNjNhNi1hZDRkLTk0NTMtYWQxYTg4NTU5YTFhIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjEwYzQ1OTcyLTFlZGMtNzk0OS1iYzkzLTUyYjkwZTAyNzMxOSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PjqHv5oAAAD/SURBVHjaYpw5cyYDDiANxHOAOAmIn2NTwIRDIz8QbwdiDyDeCeUTpZkLiLcBsS6UD6K3QMXxamYD4hVAbIUmbgPEy4GYFZdmRiCeB8S+OLziB8TzoeowNE8A4mgG/AAk34euuRKI8xiIAwVAXAFisABxJhC3MZAGQOo/skBDVpmBdPAXpPkhA5mA8aWxsjyQZibXZi8gnkaG5ixQaE8H4hoSNYJiZzosqlqBeDKRGicCcQd6IskH4qUENILkC7GlsP/Q7LcZh8ZNQJwIVYc1Y/wC4gggPo4mfhSII4H4N6Es+Q2IPYH4MpQPor2h4kQVBh+hBuwAYncoHwMABBgABy8t3vXX4OYAAAAASUVORK5CYII=';
            }else{
                this.condition.priceOrder = '';
                this.picon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAATCAYAAABPwleqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxMGM0NTk3Mi0xZWRjLTc5NDktYmM5My01MmI5MGUwMjczMTkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjEwRUYxQTkyMTE2MTFFOTk4QUVDRTRFNDMyRTZFNkUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjEwRUYxQTgyMTE2MTFFOTk4QUVDRTRFNDMyRTZFNkUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODJmOGJjOWEtNjNhNi1hZDRkLTk0NTMtYWQxYTg4NTU5YTFhIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjEwYzQ1OTcyLTFlZGMtNzk0OS1iYzkzLTUyYjkwZTAyNzMxOSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PjUxYEEAAAD9SURBVHjaYpw5cyYDDiANxHOAOAmIn2NTwIRDIz8QbwdiDyDeCeUTpZkLiLcBsS6UD6K3QMXxamYD4hVAbIUmbgPEy4GYFZdmRiCeB8S+OLziB8TzoeowNE8A4mgG/AAk34euuRKI8xiIAwVAXAFisABxJhC3MZAGQOo/skBDVpmBdPAXpPkhA5kApFkeiJnJtdkLiKeRoTkLFNrTgbiGRI2g2JkOi6pWIJ5MpMaJQNyBnkjygXgpAY0g+UJsKew/NPttxqFxExAnQtVhzRi/gDgCiI+jiR8F4kgg/k0oS34DYk8gvgzlg2hvqDhRhcFHqAE7gNgdyscAAAEGAGMOLKKfpm4VAAAAAElFTkSuQmCC';
            }
            this.search();
        },
        orderSales(){
            this.condition.priceOrder = '';
            this.picon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAATCAYAAABPwleqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxMGM0NTk3Mi0xZWRjLTc5NDktYmM5My01MmI5MGUwMjczMTkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjEwRUYxQTkyMTE2MTFFOTk4QUVDRTRFNDMyRTZFNkUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjEwRUYxQTgyMTE2MTFFOTk4QUVDRTRFNDMyRTZFNkUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODJmOGJjOWEtNjNhNi1hZDRkLTk0NTMtYWQxYTg4NTU5YTFhIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjEwYzQ1OTcyLTFlZGMtNzk0OS1iYzkzLTUyYjkwZTAyNzMxOSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PjUxYEEAAAD9SURBVHjaYpw5cyYDDiANxHOAOAmIn2NTwIRDIz8QbwdiDyDeCeUTpZkLiLcBsS6UD6K3QMXxamYD4hVAbIUmbgPEy4GYFZdmRiCeB8S+OLziB8TzoeowNE8A4mgG/AAk34euuRKI8xiIAwVAXAFisABxJhC3MZAGQOo/skBDVpmBdPAXpPkhA5kApFkeiJnJtdkLiKeRoTkLFNrTgbiGRI2g2JkOi6pWIJ5MpMaJQNyBnkjygXgpAY0g+UJsKew/NPttxqFxExAnQtVhzRi/gDgCiI+jiR8F4kgg/k0oS34DYk8gvgzlg2hvqDhRhcFHqAE7gNgdyscAAAEGAGMOLKKfpm4VAAAAAElFTkSuQmCC';
            if(this.condition.salesOrder == ''){
                this.condition.salesOrder = 'desc';
                this.sicon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAATCAYAAABPwleqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxMGM0NTk3Mi0xZWRjLTc5NDktYmM5My01MmI5MGUwMjczMTkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzIyRUYyOEEyMTBFMTFFOTgxNTBERkEyQkU2RTI3NkUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzIyRUYyODkyMTBFMTFFOTgxNTBERkEyQkU2RTI3NkUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODJmOGJjOWEtNjNhNi1hZDRkLTk0NTMtYWQxYTg4NTU5YTFhIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjEwYzQ1OTcyLTFlZGMtNzk0OS1iYzkzLTUyYjkwZTAyNzMxOSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pn93ow0AAAEASURBVHjaYnxprMyAA0gD8RwgTgLi59gUMOHQyA/E24HYA4h3QvlEaeYC4m1ArAvlg+gtUHG8mtmAeAUQW6GJ2wDxciBmxaWZEYjnAbEvDq/4AfF8qDoMzROAOJoBPwDJ96FrrgTiPAbiQAEQV4AYLECcCcRtDKQBkPqPLNCQVWYgHfxl2ZBW9pCBTACyWR6ImcmyGUh4AfE0MjRngUJ7OhDXkKgRFDvTYVHVCsSTidQ4EYg70BNJPhAvJaARJF+ILYX9h2a/zTg0bgLiRKg6rBnjFxBHAPFxNPGjQBwJxL8JZclvQOwJxJehfBDtDRUnqjD4CDVgBxC7Q/kYACDAAJfhLaK8zH0rAAAAAElFTkSuQmCC';
            }else if(this.condition.salesOrder == 'desc'){
                this.condition.salesOrder = 'asc';
                this.sicon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAATCAYAAABPwleqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxMGM0NTk3Mi0xZWRjLTc5NDktYmM5My01MmI5MGUwMjczMTkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTFCNkQ5Q0IyMTBFMTFFOTk4NDBDMUY1MDFFRUREREYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTFCNkQ5Q0EyMTBFMTFFOTk4NDBDMUY1MDFFRUREREYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODJmOGJjOWEtNjNhNi1hZDRkLTk0NTMtYWQxYTg4NTU5YTFhIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjEwYzQ1OTcyLTFlZGMtNzk0OS1iYzkzLTUyYjkwZTAyNzMxOSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PjqHv5oAAAD/SURBVHjaYpw5cyYDDiANxHOAOAmIn2NTwIRDIz8QbwdiDyDeCeUTpZkLiLcBsS6UD6K3QMXxamYD4hVAbIUmbgPEy4GYFZdmRiCeB8S+OLziB8TzoeowNE8A4mgG/AAk34euuRKI8xiIAwVAXAFisABxJhC3MZAGQOo/skBDVpmBdPAXpPkhA5mA8aWxsjyQZibXZi8gnkaG5ixQaE8H4hoSNYJiZzosqlqBeDKRGicCcQd6IskH4qUENILkC7GlsP/Q7LcZh8ZNQJwIVYc1Y/wC4gggPo4mfhSII4H4N6Es+Q2IPYH4MpQPor2h4kQVBh+hBuwAYncoHwMABBgABy8t3vXX4OYAAAAASUVORK5CYII=';
            }else{
                this.condition.salesOrder = '';
                this.sicon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAATCAYAAABPwleqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxMGM0NTk3Mi0xZWRjLTc5NDktYmM5My01MmI5MGUwMjczMTkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjEwRUYxQTkyMTE2MTFFOTk4QUVDRTRFNDMyRTZFNkUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjEwRUYxQTgyMTE2MTFFOTk4QUVDRTRFNDMyRTZFNkUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODJmOGJjOWEtNjNhNi1hZDRkLTk0NTMtYWQxYTg4NTU5YTFhIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjEwYzQ1OTcyLTFlZGMtNzk0OS1iYzkzLTUyYjkwZTAyNzMxOSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PjUxYEEAAAD9SURBVHjaYpw5cyYDDiANxHOAOAmIn2NTwIRDIz8QbwdiDyDeCeUTpZkLiLcBsS6UD6K3QMXxamYD4hVAbIUmbgPEy4GYFZdmRiCeB8S+OLziB8TzoeowNE8A4mgG/AAk34euuRKI8xiIAwVAXAFisABxJhC3MZAGQOo/skBDVpmBdPAXpPkhA5kApFkeiJnJtdkLiKeRoTkLFNrTgbiGRI2g2JkOi6pWIJ5MpMaJQNyBnkjygXgpAY0g+UJsKew/NPttxqFxExAnQtVhzRi/gDgCiI+jiR8F4kgg/k0oS34DYk8gvgzlg2hvqDhRhcFHqAE7gNgdyscAAAEGAGMOLKKfpm4VAAAAAElFTkSuQmCC';
            }
            this.search();
        },
    }
}
</script>

<style lang="less">
.shop{
    padding-bottom: 50px;
    min-height: 100vh;
    background-color: #f5f5f5;
    .van-search__action{
        height: 30px;
        i{
            font-size: 22px;
            color: white;
        }
        &:active{
            background-color: transparent;
        }
    }
    .title{
        .red{
            span{
                &.van-grid-item__text{
                    color: red;
                } 
            }
        }
        .van-grid-item{
            .van-grid-item__content{
                // border: solid 1px red;
                // padding: 15px;
                .con{
                    display: flex;
                    align-items: center;
                    span{
                        font-size: 12px;
                    }
                    img{
                        height: 10px;
                        margin-left: 4px;
                    }

                }
            }

        }
    }
    .van-loading{
        // border: solid 1px red;
        display: flex;
        justify-content: center;
    }
    .shopMes{
        .picList{
            li{
                margin: 6px 0;
                .shop_item{
                    border-radius: 6px;
                    background-color: white;
                    .img{
                        img{
                            border-radius: 6px;
                        }
                    }
                }
            }
        }
        .bigPic{
            // border: solid 1px red;
            display: flex;
            flex-wrap: wrap;

            li{
                width: 46%;
                // border: solid 1px blue;
                margin: 4px 2%;
                background-color: white;
                border-radius: 6px;
                .picture_item{
                    padding-top: 4px;
                    .img{
                        height: auto;
                        width: 160px;
                        img{
                            height: auto;
                            width: 160px;
                            border-radius: 4px;
                        }
                    }
                    .mes{
                        padding: 0;
                        p{
                            // font-weight: bold;
                            font-size: 14px;
                        }
                    }
                }
            }
        }
    }
}
</style>