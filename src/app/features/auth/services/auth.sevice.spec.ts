import {TestBed} from "@angular/core/testing";
import {HttpClientTestingModule, HttpTestingController, } from "@angular/common/http/testing";  
import { environment } from "../../../../environments/environment";
import { AuthService } from "./auth.service";

describe('AuthService',()=>{
    let service:AuthService;
    let httpMock: HttpTestingController;
    const base = environment.apiBase;

    beforeEach(()=>{
        TestBed.configureTestingModule({
            imports:[HttpClientTestingModule],
            providers:[AuthService]
        });
        service = TestBed.inject(AuthService);
        httpMock = TestBed.inject(HttpTestingController);
    })

    afterEach(()=>httpMock.verify())

    // it('should login with valid credentials and return token + user',(done)=>{
    //     service.login('maruthi@example.com','dasar').subscribe(res=>{
    //         expect(res.token).toBeTruthy();
    //         expect(res.user.email).toBe('maruthi@example.com');
    //         expect(res.user.name).toBe('Maruthi Dasar');
    //         done();
    //     })
    //     const req = httpMock.expectOne(
    //         `${base}/users?email=maruthi%40example.com&password=123456`
    //     );
    //     expect(req.request.method).toBe('GET');
    //     req.flush([{ "id": 1, "email": "maruthi@example.com", "password": "dasar", "name": "Maruthi Dasar" }]);
    // });
});