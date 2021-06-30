<template>
    <div class="search">
        <van-search shape="round" v-model.trim="searchVal" @keydown.enter="search" placeholder="请输入产品名称" />
        <div class="mes">
            <div class="nullSearch" v-if="list.length < 1">暂无结果</div>
            <div class="hasSearch" v-else>
                <div class="t">结果如下:</div>
                <ul>
                    <li v-for="item in list" :key="item.id">
                        <picture-item :item="item"></picture-item>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import PictureItem from '../components/PictureItem.vue'
export default {
    components:{PictureItem},
    data(){
        return{
            searchVal:'',
            list:[],
        }
    },
    methods:{
        search(){
            this.$axios.get('api/product/detail/74').then(d=>{
                // console.log(d.data.data.good_list);
                let arr = d.data.data.good_list.filter(item=>{
                    return item.store_name.indexOf(this.searchVal) != -1;
                })
                this.list = arr;
            })
        },
    }
}
</script>

<style lang="less">
.search{
    font-size: 15px;
    .mes{
        .nullSearch{
            padding: 10px;
        }
        .hasSearch{
            padding: 10px;
            .t{
                margin-bottom: 10px;
            }
            ul{
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                li{
                    margin: 6px 0;
                    width: 45%;
                    border: solid 1px rgba(204, 204, 204, 0.377);
                    border-radius: 10px;
                }
            }
        }
    }
}
</style>