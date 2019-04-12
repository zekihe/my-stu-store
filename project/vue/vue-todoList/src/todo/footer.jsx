import '../assets/styles/footer.styl'

export default {
  render() {
    return (
      <div id="footer">
        <span>Written by {this.author}</span>
      </div>
    )
  },
  data(){
    return {
      author: 'Zeki'
    }
  }
}