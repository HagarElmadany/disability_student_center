<template>
  <v-app dir="rtl">
    <v-main class="bg-background">
      <v-container>
        <!-- اللوجو -->
        <v-img src="/people.png" max-width="500" class="mx-auto mb-6" />
        <h1 class="text-center mb-8" style="color:#144e70">
          استمارة التسجيل بمركز خدمة الطلاب ذوي الإعاقة
        </h1>

        <v-row>
          <!-- Sidebar Steps -->
          <v-col cols="12" md="3">
            <hr class="mb-6" />
            <div v-for="(s, i) in steps" :key="i" class="d-flex align-center mb-4">
              <v-avatar
                size="32"
                :color="step > i ? 'primary' : step === i + 1 ? 'blue-grey-darken-1' : 'grey-lighten-2'"
                class="me-3"
              >
                <span class="text-white">{{ i + 1 }}</span>
              </v-avatar>
              <span>{{ s }}</span>
            </div>
          </v-col>

          <!-- Step Content -->
          <v-col cols="12" md="9">
            <hr class="mb-6" />
            <v-card class="pa-6" form-card>
              <!-- Step 1 -->
              <div v-if="step === 1">
                <h3 class="mb-4" color="primary"><v-icon color="primary" class="me-2">mdi-account</v-icon>البيانات الشخصية</h3>
                
                <v-text-field v-model="form.name" label="الاسم" outlined />
                <v-text-field v-model="form.nationalId" label="الرقم القومي" outlined />
                <h4 class="mt-6 mb-3">النوع</h4>
                <v-radio-group v-model="form.gender">
                  <v-row>
                    <v-col cols="3" class="pa-0"><v-radio label="ذكر" value="ذكر" /></v-col>
                    <v-col cols="3" class="pa-0"> <v-radio label="أنثى" value="أنثى" /></v-col>
                  </v-row>
                  
                </v-radio-group>
                <v-text-field v-model="form.address" label="العنوان" outlined />
                <v-text-field v-model="form.phone" label="الهاتف" outlined />
                <v-text-field v-model="form.whatsapp" label="رقم الواتساب" outlined />
                <v-text-field v-model="form.email" label="الايميل" outlined />

                <h3 class="mt-6 mb-4">بيانات ولي الأمر</h3>
                <v-text-field v-model="form.guardianName" label="اسم ولي الأمر" outlined />
                <v-text-field v-model="form.guardianRelation" label="صلة القرابة" outlined />
                <v-text-field v-model="form.guardianPhone" label="هاتف ولي الأمر" outlined />

                <h3 class="mt-6 mb-4">بيانات الكلية</h3>
                <v-text-field v-model="form.college" label="الكلية" outlined />
                <v-text-field v-model="form.level" label="الفرقة" outlined />
                <v-text-field v-model="form.department" label="القسم/الشعبة" outlined />
                
                <h4 class="mt-6 mb-3">هل لديك بطاقة الخدمات المتكاملة؟</h4>
                 <v-radio-group v-model="form.hasServiceCard" row>
                  <v-row>
                    <v-col cols="3" class="pa-0"><v-radio label="نعم" value="yes" /></v-col>
                    <v-col cols="3" class="pa-0"> <v-radio label="لا" value="no" /></v-col>
                  </v-row>
                </v-radio-group>
              </div>

              <!-- Step 2 -->
              <div v-else-if="step === 2">
                <h4 class="mb-4">:التشخيص الطبي</h4>
                 <v-textarea v-model="form.medicalDiagnosis"  outlined rows="3" />

                <h3 class="mb-4">الإعاقات</h3>

               <!-- حركية -->
<h4 class="mt-6 mb-3">هل لديك إعاقة حركية؟</h4>
<v-radio-group v-model="form.disabilities.physical.has" row>
  <v-row>
    <v-col cols="3" class="pa-0"><v-radio label="نعم" value="yes" /></v-col>
    <v-col cols="3" class="pa-0"><v-radio label="لا" value="no" /></v-col>
  </v-row>
</v-radio-group>

<!-- مكان الإعاقة -->
<h4 class="mt-6 mb-3">مكان الإعاقة:</h4>
<v-row>
  <v-col cols="3" v-for="(loc, i) in physicalLocations" :key="'loc-' + i" class="pa-0">
    <v-checkbox 
      v-model="form.disabilities.physical.location" 
      :label="loc.label" 
      :value="loc.value" 
      density="compact"
      hide-details
    />
  </v-col>
</v-row>

<!-- وصف الإعاقة الحركية -->
<h4 class="mt-6 mb-3">وصف الإعاقة الحركية:</h4>
<v-row>
  <v-col cols="3" v-for="(type, i) in physicalTypes" :key="'type-' + i" class="pa-0">
    <v-checkbox 
      v-model="form.disabilities.physical.type" 
      :label="type.label" 
      :value="type.value" 
      density="compact"
      hide-details
    />
  </v-col>
</v-row>

<!-- هل تستطيع الكتابة -->
<h4 class="mt-6 mb-3">هل تستطيع الكتابة:</h4>
<v-radio-group v-model="form.disabilities.physical.canWrite" row>
  <v-row>
    <v-col cols="3" class="pa-0"><v-radio label="نعم" value="yes" /></v-col>
    <v-col cols="3" class="pa-0"><v-radio label="لا" value="no" /></v-col>
  </v-row>
</v-radio-group>

<v-text-field 
  v-model="form.disabilities.physical.writingHand" 
  label="اليد المستخدمة في الكتابة:" 
  density="compact" 
  outlined 
/>
<hr />


                <!-- سمعية -->
                <h4 class="mt-6 mb-3">إعاقة سمعية</h4>
                <v-radio-group v-model="form.disabilities.hearing.has" row>
                  <v-row>
                    <v-col cols="3" class="pa-0"><v-radio label="نعم" value="yes" /></v-col>
                    <v-col cols="3" class="pa-0"> <v-radio label="لا" value="no" /></v-col>
                  </v-row>
                </v-radio-group>
                  <v-text-field v-model="form.disabilities.hearing.place" label="مكان الإعاقة" density="compact" outlined />

                <h4 class="mt-6 mb-3">هل تم زرع قوقعة؟</h4>
                <v-radio-group v-model="form.disabilities.hearing.cochlearImplant" row>
                  <v-row>
                     <v-col cols="3" class="pa-0"><v-radio label="نعم" value="yes" /></v-col>
                    <v-col cols="3" class="pa-0"> <v-radio label="لا" value="no" /></v-col>
                  </v-row>
                </v-radio-group>

                   <h4 class="mt-6 mb-3">هل تحتاج سماعة جديدة؟</h4>
                    <v-radio-group v-model="form.disabilities.hearing.needDevice" row>
                      <v-row>
                        <v-col cols="3" class="pa-0"><v-radio label="نعم" value="yes" /></v-col>
                        <v-col cols="3" class="pa-0"> <v-radio label="لا" value="no" /></v-col>
                      </v-row>
                </v-radio-group>
                   
                <h4 class="mt-6 mb-3">هل تتقن لغة الإشارة؟</h4>
                <v-radio-group v-model="form.disabilities.hearing.signLanguage"  row>
                      <v-row>
                        <v-col cols="3" class="pa-0"><v-radio label="نعم" value="yes" /></v-col>
                        <v-col cols="3" class="pa-0"> <v-radio label="لا" value="no" /></v-col>
                      </v-row>
                </v-radio-group>

                <hr class="my-4" />

                <!-- Visual -->
                <h4 class="mt-6 mb-3">الإعاقة البصرية</h4>
                <v-radio-group v-model="form.disabilities.visual.has" row>
                  <v-row>
                        <v-col cols="3" class="pa-0"><v-radio label="نعم" value="yes" /></v-col>
                        <v-col cols="3" class="pa-0"> <v-radio label="لا" value="no" /></v-col>
                      </v-row>
                </v-radio-group>
                
                                <h4 class="mt-6 mb-3">المهارات المساعدة:</h4>
                <v-row>
                    <v-col cols="3" v-for="opt in visualTypes" :key="opt.value">
                    <v-checkbox v-model="form.disabilities.visual.skills" :label="opt.label" :value="opt.value" />
                  </v-col>
                </v-row>
                  

          <h4 class="mt-6 mb-3">وصف الاعاقة :</h4>
                <v-row>
                  <v-col cols="6" v-for="opt in visualSkills" :key="opt.value">
                    <v-checkbox v-model="form.disabilities.visual.skills" :label="opt.label" :value="opt.value" />
                  </v-col>
                </v-row>

                          <h4 class="mt-6 mb-3">العصا البيضاء: هل تحتاج تدريب؟</h4>
                <v-radio-group v-model="form.disabilities.visual.whiteCane"  row>
                  <v-row>
                        <v-col cols="3" class="pa-0"><v-radio label="نعم" value="yes" /></v-col>
                        <v-col cols="3" class="pa-0"> <v-radio label="لا" value="no" /></v-col>
                      </v-row>
                </v-radio-group>

                                
<hr class="my-4" />
                <!-- ذهنية -->
                <h4 class="mt-6 mb-3">?هل لديك اعاقة ذهنية</h4>
                <v-radio-group v-model="form.disabilities.mental.has" row>
                  <v-row>
                    <v-col cols="3" class="pa-0"><v-radio label="نعم" value="yes" /></v-col>
                    <v-col cols="3" class="pa-0"> <v-radio label="لا" value="no" /></v-col>
                  </v-row>
                </v-radio-group>
                
                 <h4  class="mt-6 mb-3">وصف الاعاقة:</h4>
                 <v-row>
                                    <v-col cols="3" v-for="(m, i) in mentalTypes" :key="i">
                <v-checkbox  v-model="form.disabilities.mental.type" :label="m.label" :value="m.value" />
                                    </v-col>
              </v-row>

                    <v-text-field v-model="form.disabilities.mental.iq" label="IQ" density="compact" outlined />
                <v-text-field v-model="form.disabilities.mental.iqDate" label="تاريخه" density="compact" outlined />
               <hr class="my-4" />
                <h4 class="mt-6 mb-3">	برجاء ذكر أي حالة أخرى غير مسجلة: </h4>
                <v-textarea v-model="form.disabilities.mental.other"  outlined rows="2" />

              </div>

              <!-- Step 3 -->
              <div v-else-if="step === 3">
                <h3 class="mb-4">كيف تؤثر الإعاقة عليك أكاديمياً? </h3>
                <h4 class="mt-6 mb-3">مشكلات الانتقال:</h4>
                <v-row>
                  <v-col cols="4" v-for="opt in academicMobility" :key="opt.value">
                    <v-checkbox v-model="form.problems.mobility" :label="opt.label" :value="opt.value" />
                  </v-col>
                </v-row>

                <h4 class="mt-6 mb-3">مشكلات البيئة الداخلية:</h4>
                <v-row>
                  <v-col cols="4" v-for="opt in academicEnvironment" :key="opt.value">
                    <v-checkbox v-model="form.problems.environment" :label="opt.label" :value="opt.value" />
                  </v-col>
                </v-row>

                <h4 class="mt-6 mb-3">مشكلات التدريس:</h4>
                <v-row>
                  <v-col cols="4" v-for="opt in academicTeaching" :key="opt.value">
                    <v-checkbox v-model="form.problems.teaching" :label="opt.label" :value="opt.value" />
                  </v-col>
                </v-row>

                                <h4 class="mt-6 mb-3">التجهيزات المطلوبة</h4>
                <v-textarea v-model="form.problems.requiredSupport" label="التجهيزات المطلوبة" outlined rows="3" />
              </div>


              
             
               <!-- Step 4: Talents & Work -->
              <div v-else-if="step === 4">
                <h3 class="mb-2">المواهب والعمل</h3>
                <hr class="mb-4" />

                      <h4 class="mt-6 mb-3">هل لديك مواهب؟</h4>
                <v-radio-group v-model="form.hasTalent" row>
                 <v-row>
                    <v-col cols="3" class="pa-0"><v-radio label="نعم" value="yes" /></v-col>
                    <v-col cols="3" class="pa-0"> <v-radio label="لا" value="no" /></v-col>
                  </v-row>
                </v-radio-group>

                <v-text-field v-model="form.talentDesc" label="ماهي المواهب إن وجدت: " density="compact" outlined />
                <v-text-field v-model="form.talentPractice" label="هل مازلت تمارس" density="compact" outlined />
                <v-text-field v-model="form.talentPlace" label="أين" density="compact" outlined />

                <h4 class="mt-6 mb-3">هل تعمل؟</h4>
                <v-radio-group v-model="form.isWorking"  row>
                  <v-row>
                    <v-col cols="3" class="pa-0"><v-radio label="نعم" value="yes" /></v-col>
                    <v-col cols="3" class="pa-0"> <v-radio label="لا" value="no" /></v-col>
                  </v-row>
                </v-radio-group>
                <v-text-field v-model="form.workDuration" label="مدة العمل" density="compact" outlined />
              </div>

              <!-- Actions -->
              <div class="d-flex justify-space-between mt-6">
                <v-btn 
                color="primary"
                class="rounded-pill px-6"
                v-if="step > 1" variant="outlined" @click="step--">السابق</v-btn>
                <v-spacer />
                <v-btn  class="rounded-pill px-8" color="primary" @click="nextStep" >
                  {{ step === steps.length ? 'إرسال' : 'التالي' }}
                </v-btn>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from "vue"

const step = ref(1)
const steps = [
  "البيانات الشخصية",
  "الإعاقات",
  "المشكلات الأكاديمية",
  "مواهب / بيانات إضافية"
]

const form = ref({
  name: "",
  nationalId: "",
  gender: "",
  address: "",
  phone: "",
  whatsapp: "",
  email: "",
  guardianName: "",
  guardianRelation: "",
  guardianPhone: "",
  college: "",
  level: "",
  department: "",
  hasServiceCard: "",
  medicalDiagnosis: "",

  disabilities: {
    physical: { has: "", location: [], type: [], canWrite: "", writingHand: "" },
    hearing: { has: "", place: "", cochlearImplant: "", needDevice: "", signLanguage: "" },
    visual: { has: "", type: [], rightEye: "", leftEye: "", skills: [], whiteCane: "" },
    mental: { has: "", type: [], iq: "", iqDate: "", other: "" }
  },

  problems: {
    mobility: [],
    environment: [],
    teaching: [],
    requiredSupport: ""
  },

  hasTalent: "",
  talentDesc: "",
  talentPractice: "",
  talentPlace: "",
  isWorking: "",
  workDuration: ""
})


const physicalLocations = [
  { label: "اليد اليمنى", value: "rightHand" },
  { label: "اليد اليسرى", value: "leftHand" },
  { label: "الرجل اليمنى", value: "rightLeg" },
  { label: "الرجل اليسرى", value: "leftLeg" }
]

const physicalTypes = [
  { label: "شلل طولى", value: "paralysisLong" },
  { label: "شلل نصفى", value: "paralysisHalf" },
  { label: "شلل رباعى", value: "paralysisQuad" },
  { label: "شلل احادى", value: "paralysisSingle" },
  { label: "ضمور عضلات", value: "muscleAtrophy" },
  { label: "مرض مفصلى", value: "jointDisease" },
  { label: "بتر", value: "amputation" },
  { label: "اتزان", value: "balance" }
]

const visualTypes = [
  { label: "كفيف", value: "blind" },
  { label: "صعوبة تمييز الألوان", value: "colorBlind" },
  { label: "رأرأة", value: "nystagmus" },
  { label: "حول العين", value: "squint" },
  { label: "ضعف بصر", value: "weakVision" },
  { label: "درجة العين اليمنى ", value: "weakVisionright" },
  { label: "درجة العين اليسري", value: "weakVisionleft" }


  
]

const mentalTypes = [
  { label: "تأخر ذهني", value: "mentalDelay" },
  { label: "صعوبات تعلم", value: "learningDisability" },
  { label: "تأخر دراسي", value: "studyDelay" },
  { label: "اضطرابات فرط الحركة", value: "adhd" },
  { label: "توحد", value: "autism" },
  { label: "متلازمة داون", value: "downSyndrome" }
]

const academicProblems = [
  { label: "بعد مكان السكن", value: "farHome" },
  { label: "لا توجد سيارات خاصة", value: "noCars" },
  { label: "الطرق غير مجهزة", value: "badRoads" },
  { label: "لا يوجد مصاعد", value: "noElevator" },
  { label: "المدرجات غير مجهزة", value: "badHalls" },
  { label: "الحمامات غير مجهزة", value: "badBathrooms" },
  { label: "أعضاء هيئة التدريس", value: "professors" },
  { label: "تأخير الكتب", value: "lateBooks" },
  { label: "الدعم غير كافي", value: "noSupport" }
]

const visualSkills = [
  { label: "قارئ إلكتروني", value: "screenReader" },
  { label: "لغة بريل", value: "braille" }
]

const academicMobility = [
  { label: "لا توجد مشكلات", value: "noProblem" },
  { label: "بعد مكان السكن", value: "farHome" },
  { label: "لا توجد سيارات خاصة", value: "noCars" },
  { label: "الطرق غير مجهزة", value: "badRoads" }
]

const academicEnvironment = [
  { label: "لا توجد مشكلات", value: "noProblem" },
  { label: "لا يوجد مصاعد", value: "noElevator" },
  { label: "لا يوجد نقل داخلي", value: "noInternalTransport" },
  { label: "الأماكن غير مجهزة", value: "badPlaces" },
  { label: "المدرجات غير مجهزة", value: "badHalls" },
  { label: "الحمامات غير مجهزة", value: "badBathrooms" },
  { label: "لا يوجد مكان مناسب لانتظار المرافقين", value: "noWaitingArea" }
]

const academicTeaching = [
  { label: "لا توجد مشكلات", value: "noProblem" },
  { label: "أعضاء هيئة التدريس", value: "professors" },
  { label: "تأخير الكتب", value: "lateBooks" },
  { label: "الدعم غير كافي", value: "noSupport" },
  { label: "التخصصات لا تتناسب مع الطالب", value: "badSpecialization" }
]


function nextStep() {
  if (step.value < steps.length) step.value++
  else alert("تم إرسال الاستمارة ✅")
}
</script>

<style>
.bg-background {
  background-color: #f9fbfd;
}

.form-card {
  background-color: #e6f4f9; /* سماوي فاتح */
  border: 1px solid #d0e8f2; /* بوردر خفيف */
  border-radius: 12px;
}



</style>
