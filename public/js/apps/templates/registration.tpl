<style type="text/css">
  .upload-logo {
      background: rgba(0, 0, 0, 0) url("image/uploadlogo.png") no-repeat scroll 0;
      border: 3px dashed #7a7c7f;
      color: #808080;
      height: 100px;
      width: 100px;
      margin: 30px auto;
      background-size: 100%;
  }
  .upload-doc {
      background: rgba(0, 0, 0, 0) url("image/uploaddoc.png") no-repeat scroll 0;
      border: 3px dashed #7a7c7f;
      color: #808080;
      height: 100px;
      width: 100px;
      margin: 30px auto;
      background-size: 100%;
  }
  .upload-logo.hover, .upload-doc.hover {
      border: 3px dashed #f00;
  }
  input:invalid {
    border: 1px solid red;
  }
</style>
<div id="leadscont" class="">

  <!-- Start Page Header -->
  <div class="page-header">
    <h1 class="title">Client Registration</h1>
    <!-- Start Page Header Right Div -->
    <div class="left">
      <div class="btn-group" role="group" aria-label="...">
        <a href="#home" class="btn btn-light"><i class="fa fa-chevron-circle-left"> Back</i></a>
      </div>
    </div>
    <!-- End Page Header Right Div -->
  </div>
  <!-- End Page Header -->

 <!-- //////////////////////////////////////////////////////////////////////////// --> 
  <!-- START CONTAINER -->
  <div class="container-padding">
    <!-- Start Row -->
    <div class="row">
    <div class="col-xs-12 col-sm-6">
        <div class="panel panel-default">

          <div class="panel-title">
            Reservation Details
            <ul class="panel-tools">
              <li><a class="icon minimise-tool"><i class="fa fa-minus"></i></a></li>
              <li><a class="icon expand-tool"><i class="fa fa-expand"></i></a></li>
              <li><a class="icon closed-tool"><i class="fa fa-times"></i></a></li>
            </ul>
          </div>

          <div class="panel-body" id='eform'>
            <form class="form-horizontal" id="frmu1">
            
              <div class="form-group">
                <label class="col-sm-2 control-label form-label">Event</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" name="event" id="" value="<%= event.name %>" disabled>
                </div>           
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label form-label">Location</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" name="location" value="<%= event.location.name %>" disabled>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label form-label">Area</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" name="location" value="<%= stall.sq_feet %> sq. ft." disabled>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label form-label">Stand</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" name="stall" value="Stand ID: <%= event.location.id %>-<%= stall.name %>" disabled>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label form-label">Time Period</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" name="period" value="<%= event.begin_at %> to <%= event.end_at %>" disabled>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label form-label">Price</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" name="amount" value="<%= stall.price %>" disabled>
                </div>
              </div>
              <input type="hidden" name="_token" value="{{ csrf_token() }}">
            </form>

          </div>

        </div>
      </div>

      <div class="col-xs-12 col-sm-6">
        <div class="panel panel-default">

          <div class="panel-title">
            Client Details
            <ul class="panel-tools">
              <li><a class="icon minimise-tool"><i class="fa fa-minus"></i></a></li>
              <li><a class="icon expand-tool"><i class="fa fa-expand"></i></a></li>
              <li><a class="icon closed-tool"><i class="fa fa-times"></i></a></li>
            </ul>
          </div>

              <div class="panel-body">
                <form class="form-horizontal" id="frmu2">
                <input type="hidden" name="id" value="<%= id %>" >
                <input type="hidden" name="amount" value="<%= stall.price %>" >
                  <div class="group upload-logo">
                    <input type="file" value="" name="logo" style="display:none" id="plogo">
                    <span></span>
                  </div>
                  <div class="form-group">
                    <label class="col-sm-2 control-label form-label">Company:<span class="color10">*</span></label>
                    <div class="col-sm-10">
                      <input type="text" class="form-control" name="company" id="">
                    </div>        
                  </div>
                  <div class="form-group">
                    <label class="col-sm-2 control-label form-label">Physical Address:<span class="color10">*</span>
                    </label>
                    <div class="col-sm-10">
                      <input type="text" class="form-control" name="address" id="">
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-sm-2 control-label form-label">Website:
                    </label>
                    <div class="col-sm-10">
                      <input type="test" class="form-control" name="site" id="">
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-sm-2 control-label form-label">Contact Person:<span class="color10">*</span></label>
                    </label>
                    <div class="col-sm-10">
                      <input type="text" class="form-control" name="person" id="">
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="col-sm-2 control-label form-label">Contact Email:<span class="color10">*</span></label>
                    </label>
                    <div class="col-sm-10">
                      <input type="email" class="form-control" name="email" id="">
                    </div>
                  </div>
                  <!--div class="form-group">
                    <label class="col-sm-2 control-label form-label">Contact Tel:<span class="color10">*</span></label>
                    </label>
                    <div class="col-sm-10">
                      <input type="text" class="form-control" name="phone" id="">
                    </div>
                  </div>
                  <div class="group upload-doc">
                    <input type="file" value="" name="document" style="display:none" id="pdocs">
                    <span></span>
                  </div-->
                  <input type="hidden" name="_token" value="{{ csrf_token() }}">
                  <a href="#" class="btn btn-default ucreate">Submit</a>
                  <a href="#" class="btn btn-warning ucancel">Cancel</a>
                </form>

              </div>

        </div>
      </div>

    </div>
    <!-- End Row -->
  </div>
</div>