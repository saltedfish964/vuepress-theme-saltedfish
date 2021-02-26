<script>
export default {
  mounted() {
    this.$router.replace('/blog/article/').catch(() => {});
  },
}
</script>