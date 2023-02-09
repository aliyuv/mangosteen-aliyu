import { computed, onMounted, onUnmounted, Ref, ref } from "vue";

type Point = {
  x: number;
  y: number;
}

export const useSwiper = (element: Ref<HTMLElement | null>) => {
  const start = ref<Point | null>(null)
  const end = ref<Point | null>(null)
  const swiping = ref(false)
  const distance = computed(() => {
    if (!start.value || !end.value) { return null }
    return {
      x: end.value.x - start.value.x,
      y: end.value.y - start.value.y
    }
  })
  const direction = computed(() => {
    if (!distance.value) { return '' }
    const { x, y } = distance.value
    if (Math.abs(x) > Math.abs(y)) { //对于屏幕的坐标系，x轴是水平方向，y轴是垂直方向，所以x轴的绝对值大于y轴的绝对值，就是左右滑动
      return x > 0 ? 'right' : 'left' 
    } else if (Math.abs(x) < Math.abs(y)) { //对于屏幕的坐标系，x轴是水平方向，y轴是垂直方向，所以x轴的绝对值小于y轴的绝对值，就是上下滑动
      return y > 0 ? 'down' : 'up'
    }
  })
  const onTochStart = (e: TouchEvent) => {
    end.value = start.value = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    swiping.value = true
  }
  const onTouchMove = (e: TouchEvent) => {
    if (!start.value) { return }
    end.value = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }
  const onTouchEnd = (e: TouchEvent) => {
    swiping.value = false
  }
  onMounted(() => {
    if (!element.value) { return }
    element.value.addEventListener('touchstart', onTochStart)
    element.value.addEventListener('touchmove', onTouchMove)
    element.value.addEventListener('touchend', onTouchEnd)
  })
  onUnmounted(() => {
    if (!element.value) { return }
    element.value.removeEventListener('touchstart', onTochStart)
    element.value.removeEventListener('touchmove', onTouchMove)
    element.value.removeEventListener('touchend', onTouchEnd)
  })
  return { start, end, swiping, distance, direction }
}