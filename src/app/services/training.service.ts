import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class TrainingService {

    contentDuration: any;
    contentCreationData: any = {};
    isComingFromEditBox: boolean = false;
    makeTrainingTypeSaveButtonValid: boolean = false;
    public subject = new BehaviorSubject<any>('Initial value');

    constructor(
        private http: HttpClient
    ) { }

    getTrainingType() {
        return this.http.get(`${environment.apiUrl}/training/getTrainingType`);
    }

    getProjects() {
        return this.http.get(`${environment.apiUrl}/training/getProjects`);
    }

    addTrainingType(data: any) {
        return this.http.post(`${environment.apiUrl}/training/addUpdateTrainingType`, data);
    }

    getDomain(trainingId: any) {
        return this.http.get(`${environment.apiUrl}/training/getDomains?trainingId=${trainingId}`);
    }

    getContentCreationData(parentId: any, type: string) {
        return this.http.get(`${environment.apiUrl}/training/getListByType?parentId=${parentId}&type=${type}`);
    }

    addTrainingContent(data: any) {
        return this.http.post(`${environment.apiUrl}/training/modifyTrainingContent`, data);
    }

    getSkill(domainId: any) {
        return this.http.get(`${environment.apiUrl}/training/getSkill?domainId=${domainId}`);
    }

    getModules() {
        return this.http.get(`${environment.apiUrl}/module`);
    }

    addModule(data: any) {
        return this.http.post(`${environment.apiUrl}/training/addUpdateModule`, data);
    }

    getTopic() {
        return this.http.get(`${environment.apiUrl}/topic`);
    }

    getSubTopic() {
        return this.http.get(`${environment.apiUrl}/sub_topic`);
    }

    addDomain(data: any) {
        return this.http.post(`${environment.apiUrl}/training/addUpdateDomain`, data);
    }

    addSkill(data: any) {
        return this.http.post(`${environment.apiUrl}/training/AddUpdateSkill`, data);
    }

    addTopic(data: any) {
        return this.http.post(`${environment.apiUrl}/training/insertUpdateModuleTopic`, data)
    }

    addSubTopic(data: any) {
        return this.http.post(`${environment.apiUrl}/training/insertUpdateModuleSubTopic`, data)
    }

    getTrainingContentList(data: any) {
        return this.http.post(`${environment.apiUrl}/training/getPagedTrainingContent`, data);
    }

    editTrainingType(data: any) {
        return this.http.post(`${environment.apiUrl}/training/addUpdateTrainingType`, data)
    }

    editDomain(data: any) {
        return this.http.post(`${environment.apiUrl}/training/addUpdateDomain`, data)
    }

    editSkill(data: any) {
        return this.http.post(`${environment.apiUrl}/training/addUpdateSkill`, data)
    }

    editModule(data: any) {
        return this.http.post(`${environment.apiUrl}/training/addUpdateModule`, data)
    }

    editTopic(data: any) {
        return this.http.post(`${environment.apiUrl}/training/insertUpdateModuleTopic`, data)
    }

    editSubTopic(data: any) {
        return this.http.post(`${environment.apiUrl}/training/insertUpdateModuleSubTopic`, data)
    }

    uploadBulkFile(data: any) {
        return this.http.post(`${environment.apiUrl}/training/uploadBulkFile`,{data: data} )
    }

    downloadLogFile(fileName: string) {
        let header = {responseType: 'blob' as 'json'};
        return this.http.get(`${environment.apiUrl}/training/downloadFile?fileName=`+ fileName, header);
    }

    sendMessage(message: any) {
        this.subject.next(message);
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }

    resetContentCreationDataData() {
        this.contentCreationData = {};
    }

    changeStatus(Object: any){
        return this.http.post(`${environment.apiUrl}/training/changeStatus`,Object);
    }

    filterData(data : any){
        return this.http.post(`${environment.apiUrl}/training/getPagedTrainingContent`,data);
    }

    getDomainList(){
        return this.http.get(`${environment.apiUrl}/training/getDomainList`);
    }

    getSkillList(){
        return this.http.get(`${environment.apiUrl}/training/getSkillList`);
    }

    getModuleList(){
        return this.http.get(`${environment.apiUrl}/training/getModuleList`);
    }

    getTopicList(){
        return this.http.get(`${environment.apiUrl}/training/getTopicList`);
    }

    getSubTopicList(){
        return this.http.get(`${environment.apiUrl}/training/getSubTopicList`);
    }

    getStatusByType(data : any){
        return this.http.get(`${environment.apiUrl}/training/getStatusByType?type=${data}`);
    }

    getSpecificStatus(data :  any){
        return this.http.get(`${environment.apiUrl}/training/getSpecificStatus?TrainingStatusId=${data}`)
    }

    getPlanListing(){
        return this.http.get(`${environment.apiUrl}/training-plan/getTrainingPlanList`)
    }

    addTrainingPlan(planObject : object){
        return this.http.post(`${environment.apiUrl}/training-plan/insertTrainingPlan`, planObject)
    }

    changeTrainingPlanStatus(object : any){
        return this.http.post(`${environment.apiUrl}/training-plan/changeTrainingPlanStatus`, object)
    }

    getLeaves(type : string){
        return this.http.get(`${environment.apiUrl}/training-plan/getLeaves?Type=${type}`)
    }

    getAllLowerLeaves(data:any){
        return this.http.post(`${environment.apiUrl}/training-plan/getTrainingPlanDropdowns`,data)
    }

    getVenueTypeList(){
        return this.http.get(`${environment.apiUrl}/training/getVenueTypeList`);
    }

    getAllFeedback(){
        return this.http.get(`${environment.apiUrl}/training/getAllFeedback`);
    }

    getScheduleList(){
        return this.http.get(`${environment.apiUrl}/getScheduleList`);
    }

    getTrainingScheduleList(){
        return this.http.get(`${environment.apiUrl}/getTrainingScheduleList`);
    }

    addTrainingSchedule(data: any){
        return this.http.post(`${environment.apiUrl}/insertTrainingSchedule`, data);    
    }

    getTrainers(projectId:any, skillId:any){
        return this.http.get(`${environment.apiUrl}/getTrainersList?projectdId=${projectId}&skillId=${skillId}`);    
    }

    getEvaluators(projectId : any){
        return this.http.get(`${environment.apiUrl}/getEvaluatorsList?projectdId=${projectId}`);    
    }

    getParticipants(projectId:any, skillId : any){
        return this.http.get(`${environment.apiUrl}/getParticipantsList?projectdId=${projectId}&skillId=${skillId}`);    
    }

    clearLabelData(comp: string) {
        switch (comp) {

            case 'trainingType': {
                this.contentCreationData.TrainingTypeObj = null;
                this.contentCreationData.DomainObj = null;
                this.contentCreationData.SkillObj = null;
                this.contentCreationData.ModuleObj = null;
                this.contentCreationData.TopicObj = null;
                this.contentCreationData.SubTopicObj = null;

                break;
            }

            case 'domain': {
                this.contentCreationData.DomainObj = null;
                this.contentCreationData.SkillObj = null;
                this.contentCreationData.ModuleObj = null;
                this.contentCreationData.TopicObj = null;
                this.contentCreationData.SubTopicObj = null;

                break;
            }

            case 'skill': {
                this.contentCreationData.SkillObj = null;
                this.contentCreationData.ModuleObj = null;
                this.contentCreationData.TopicObj = null;
                this.contentCreationData.SubTopicObj = null;

                break;
            }

            case 'module': {
                this.contentCreationData.ModuleObj = null;
                this.contentCreationData.TopicObj = null;
                this.contentCreationData.SubTopicObj = null;

                break;
            }

            case 'topic': {
                this.contentCreationData.TopicObj = null;
                this.contentCreationData.SubTopicObj = null;

                break;
            }

            case 'subTopic': {
                this.contentCreationData.SubTopicObj = null;

                break;
            }
        }

    }
}