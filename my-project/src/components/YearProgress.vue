<template>
    <div class="progressbar">
        <progress :percent='percent' activeColor="#0099FF" active="true" 
        stroke-width="12" border-radius='30px' />
        <p>{{year}}已经过去了{{data}}天，{{percent}}%</p>
    </div>
</template>

<script>
export default {
    methods:{
        isLeapYear(){
            const year = new Date().getFullYear();
            if(year%400===0){
                return true;
            }else if(year%4===0 && year%100!==0){
                return true;
            }else{
                return false;
            }
        },
        getDayOfYear(){
            return this.isLeapYear()?366:365;
        }
    },
    computed:{
        year(){
            return new Date().getFullYear()
        },
        data(){
            let start = new Date();
            start.setMonth(0);
            start.setDate(0);
            let offset = new Date().getTime()-start.getTime();
            return parseInt(offset/1000/60/60/24);
        },
        percent(){
            return (this.data*100/this.getDayOfYear()).toFixed(2)
        }
    }
}
</script>

<style>
.progressbar{
    width: 100%;
}
.progressbar progress{
    margin: 10px;

}
.progressbar p{
    width: 100%;
    text-align: center;
}
</style>
