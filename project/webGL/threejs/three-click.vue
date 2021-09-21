<template>
    <div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
            }
        },
        components: {},
        props: {},
        created () {
            // 声明raycaster和mouse变量
            var raycaster = new THREE.Raycaster();
            var mouse = new THREE.Vector2();

        },
        mounted () {
            window.addEventListener( 'click', onMouseClick, false );
        },
        methods: {
            onMouseClick( event ) {
                // 通过鼠标点击的位置计算出raycaster所需要的点的位置，以屏幕中心为原点，值的范围为-1到1.
                mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
                mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

                // 通过鼠标点的位置和当前相机的矩阵计算出raycaster
                raycaster.setFromCamera( mouse, camera );

                // 获取raycaster直线和所有模型相交的数组集合
                var intersects = raycaster.intersectObjects( scene.children );
                console.log(intersects);
                
                // 将所有的相交的模型的颜色设置为红色，如果只需要将第一个触发事件，那就数组的第一个模型改变颜色即可
                for ( var i = 0; i < intersects.length; i++ ) {
                    intersects[ i ].object.material.color.set( 0xff0000 );
                }
            }
        }
    }
</script>
<style scoped>
/* css */
</style>
