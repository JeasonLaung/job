import {action} from '@/api'
import {REQUEST_HOST} from '@/config'
export default {
  data () {
    return {
      REQUEST_HOST
    }
  },
  methods: {
    makePhoneCall (phoneNumber) {
      if (/^1[3-9]{1}[0-9]{9}$/.test(phoneNumber) || /^(\d{2,4}-)?\d{7,8}$/.test(phoneNumber)) {
        mpvue.makePhoneCall({
          phoneNumber
        })
      }
    },
    collect (e) {
      let formId = e.mp.detail.formId
      action(formId)
    }
  }
}
